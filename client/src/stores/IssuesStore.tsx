import type {DependencyList} from 'react';
import {createLocalPersister} from 'tinybase/persisters/persister-browser/with-schemas';
import * as UiReact from 'tinybase/ui-react/with-schemas';
import {
  createStore,
  type Cell,
  type Id,
  type NoValuesSchema,
  type Store,
} from 'tinybase/with-schemas';
import {useScheduleTaskRun, useSetTask} from 'tinytick/ui-react';
import {STAGGER} from './common';
import {getNextPage, getPageOptions, hasToken, octokit} from './octokit';
import {useUiValue} from './ViewStore';

type AsId<Key> = Exclude<Key & Id, number>;

const STORE_ID = 'issues';
const TABLE_ID = 'issues';

const PERSISTER_ID = 'issues';

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
  usePersisterStatus,
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

export const useIssuesPersisterStatus = () => usePersisterStatus(PERSISTER_ID);

export const IssuesStore = () => {
  const currentRepoId = useUiValue('repoId');
  const issuesStore = useCreateStore(
    () => createStore().setTablesSchema(TABLES_SCHEMA),
    [currentRepoId],
  );
  useProvideStore(STORE_ID, issuesStore);

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
    async (persister) => persister?.startAutoPersisting(),
    [],
  );

  useFetch(issuesStore, currentRepoId);

  return null;
};

const useFetch = (issuesStore: Store<Schemas>, repoId: string) => {
  useSetTask(
    'fetchIssues',
    async (repoIdAndPage: string = '[""]', _abort, {manager, taskId}) => {
      const [repoId, page = '1'] = JSON.parse(repoIdAndPage);

      if (hasToken() && repoId) {
        const [owner, repo] = repoId.split('/');
        const response = await octokit.rest.issues.listForRepo({
          owner,
          repo,
          mediaType: {format: 'html'},
          ...getPageOptions(page),
        });

        response.data.forEach(
          ({number, title, pull_request, body_html, created_at, updated_at}) =>
            issuesStore.setRow(TABLE_ID, number + '', {
              title,
              pullRequest: pull_request != undefined,
              bodyHtml: body_html ?? '',
              createdAt: created_at,
              updatedAt: updated_at,
            }),
        );

        const nextPage = getNextPage(response);
        if (nextPage) {
          await manager.untilTaskRunDone(
            manager.scheduleTaskRun(
              taskId,
              JSON.stringify([repoId, nextPage]),
              STAGGER,
            )!,
          );
        }
      }
    },
    [issuesStore],
    'multiFetch',
  );

  useScheduleTaskRun('fetchIssues', JSON.stringify([repoId]));
};
