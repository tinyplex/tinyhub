import * as UiReact from 'tinybase/ui-react/with-schemas';
import type {Cell, Id, NoValuesSchema} from 'tinybase/with-schemas';
import {PER_PAGE, REFRESH_INTERVAL} from './common';
import {type Store, type Table, createStore} from 'tinybase/with-schemas';
import type {DependencyList} from 'react';
import {createCustomPersister} from 'tinybase/persisters/with-schemas';
import {createLocalPersister} from 'tinybase/persisters/persister-browser/with-schemas';
import {octokit} from './octokit';
import {useUiValue} from './ViewStore';

type AsId<Key> = Exclude<Key & Id, number>;

const STORE_ID = 'issues';
const TABLE_ID = 'issues';

const TABLES_SCHEMA = {
  issues: {
    title: {type: 'string', default: ''},
    pullRequest: {type: 'boolean', default: false},
    bodyHtml: {type: 'string', default: ''},
    createdAt: {type: 'string', default: ''},
    updatedAt: {type: 'string', default: ''},
  },
} as const;
type Schemas = [typeof TABLES_SCHEMA, NoValuesSchema];
const {
  useCreateStore,
  useProvideStore,
  useCreatePersister,
  useCell,
  useSetCellCallback,
  useSortedRowIds,
} = UiReact as UiReact.WithSchemas<Schemas>;
type TableIds = keyof typeof TABLES_SCHEMA;
type CellIds<TableId extends TableIds> = AsId<
  keyof (typeof TABLES_SCHEMA)[TableId]
>;

export const useIssueCell = <CellId extends CellIds<typeof TABLE_ID>>(
  issueId: Id,
  cellId: CellId,
) => useCell(TABLE_ID, issueId, cellId, STORE_ID);

export const useSetIssueCellCallback = <
  Parameter,
  CellId extends CellIds<typeof TABLE_ID>,
>(
  issueId: Id,
  cellId: CellId,
  getCell: (parameter: Parameter) => Cell<Schemas[0], typeof TABLE_ID, CellId>,
  getCellDeps?: DependencyList,
) =>
  useSetCellCallback(TABLE_ID, issueId, cellId, getCell, getCellDeps, STORE_ID);

export const useIssuesSortedRowIds = (
  cellId: CellIds<typeof TABLE_ID>,
  descending: boolean,
) =>
  useSortedRowIds(TABLE_ID, cellId, descending, undefined, undefined, STORE_ID);

export const IssuesStore = () => {
  const currentRepoId = useUiValue('repoId');
  const issuesStore = useCreateStore(
    () => createStore().setTablesSchema(TABLES_SCHEMA),
    [currentRepoId],
  );
  useCreatePersister(
    issuesStore,
    (issuesStore) => {
      if (currentRepoId) {
        return createLocalPersister(
          issuesStore,
          currentRepoId + '/' + STORE_ID,
        );
      }
    },
    [currentRepoId],
    async (persister) => {
      await persister?.startAutoLoad();
      await persister?.startAutoSave();
    },
    [],
  );

  useCreatePersister(
    issuesStore,
    (issuesStore) => {
      if (currentRepoId) {
        return createGithubIssuesLoadingPersister(issuesStore, currentRepoId);
      }
    },
    [currentRepoId],
    async (persister) => {
      await persister?.load();
    },
    [],
  );

  useProvideStore(STORE_ID, issuesStore);
  return null;
};

const createGithubIssuesLoadingPersister = (
  store: Store<Schemas>,
  repoId: string,
) =>
  createCustomPersister(
    store,
    async () => {
      const [owner, repo] = repoId.split('/');
      const issues: Table<Schemas[0], typeof TABLE_ID> = {};
      (
        await octokit.rest.issues.listForRepo({
          owner,
          repo,
          mediaType: {format: 'html'},
          ...PER_PAGE,
        })
      ).data.forEach(
        ({number, title, pull_request, body_html, created_at, updated_at}) =>
          (issues[number] = {
            title,
            pullRequest: pull_request != undefined,
            bodyHtml: body_html ?? '',
            createdAt: created_at,
            updatedAt: updated_at,
          }),
      );
      return [{issues}, {}];
    },
    async () => {},
    (listener) => setInterval(listener, REFRESH_INTERVAL),
    (intervalId) => clearInterval(intervalId),
  );
