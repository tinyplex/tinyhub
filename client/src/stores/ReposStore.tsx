import {useCallback} from 'react';
import {createLocalPersister} from 'tinybase/persisters/persister-browser/with-schemas';
import * as UiReact from 'tinybase/ui-react/with-schemas';
import {
  type Id,
  type NoValuesSchema,
  type Store,
  createIndexes,
  createStore,
} from 'tinybase/with-schemas';
import {useScheduleTaskRun, useSetTask} from 'tinytick/ui-react';
import {useSettingsValue} from './SettingsStore';
import {PER_PAGE} from './common';
import {octokit} from './octokit';

type AsId<Key> = Exclude<Key & Id, number>;

type RepoData = {
  full_name: string;
  owner: {login: string; avatar_url: string};
  name: string;
  created_at?: string | null;
  fork: boolean;
  forks_count?: number;
  open_issues_count?: number;
  stargazers_count?: number;
  updated_at?: string | null;
};

const REFRESH_DELAY = 1000 * 60 * 60;

const STORE_ID = 'repos';
const TABLE_ID = 'repos';

const INDEXES_ID = 'repos';
const INDEX_ID = 'reposByGroup';

const PERSISTER_ID = 'repos';

const TABLES_SCHEMA = {
  repos: {
    owner: {type: 'string', default: ''},
    name: {type: 'string', default: ''},
    starred: {type: 'boolean', default: false},
    createdAt: {type: 'string', default: ''},
    fork: {type: 'boolean', default: false},
    forksCount: {type: 'number', default: 0},
    openIssuesCount: {type: 'number', default: 0},
    stargazersCount: {type: 'number', default: 0},
    updatedAt: {type: 'string', default: ''},
  },
} as const;
type Schemas = [typeof TABLES_SCHEMA, NoValuesSchema];
const {
  useCell,
  useCreatePersister,
  useCreateStore,
  useProvideStore,
  useCreateIndexes,
  useProvideIndexes,
  useSliceRowIds,
  usePersisterStatus,
  useSliceIds,
} = UiReact as UiReact.WithSchemas<Schemas>;
type TableIds = keyof typeof TABLES_SCHEMA;
type CellIds<TableId extends TableIds> = AsId<
  keyof (typeof TABLES_SCHEMA)[TableId]
>;

export const useRepoCell = <CellId extends CellIds<typeof TABLE_ID>>(
  repoId: Id,
  cellId: CellId,
) => useCell(TABLE_ID, repoId, cellId, STORE_ID);

export const useGroupIds = () => useSliceIds(INDEX_ID, INDEXES_ID);

export const useGroupRepoIds = (group: string) =>
  useSliceRowIds(INDEX_ID, group, INDEXES_ID);

export const useReposPersisterStatus = () => usePersisterStatus(PERSISTER_ID);

export const ReposStore = () => {
  const reposStore = useCreateStore(() =>
    createStore().setTablesSchema(TABLES_SCHEMA),
  );
  useProvideStore(STORE_ID, reposStore);

  const reposSortCell = useSettingsValue('reposSortCell') as CellIds<
    typeof TABLE_ID
  >;
  const reposSortDirection =
    reposSortCell == 'name' || reposSortCell == 'fork' ? 1 : -1;
  const reposIndexes = useCreateIndexes(
    reposStore,
    (reposStore) =>
      createIndexes(reposStore).setIndexDefinition(
        INDEX_ID,
        TABLE_ID,
        (getCell) => (getCell('starred') ? 'Starred' : getCell('owner')),
        reposSortCell,
        undefined,
        (cell1, cell2) => (cell1 > cell2 ? 1 : -1) * reposSortDirection,
      ),
    [reposSortCell],
  );
  useProvideIndexes(INDEXES_ID, reposIndexes!);

  useCreatePersister(
    reposStore,
    (reposStore) => createLocalPersister(reposStore, STORE_ID),
    [],
    async (persister) => {
      await persister.startAutoLoad();
      await persister.startAutoSave();
    },
  );

  useFetch(reposStore);

  return null;
};

const useFetch = (reposStore: Store<Schemas>) => {
  const addRepo = useCallback(
    (
      {
        full_name,
        owner,
        name,
        created_at,
        fork,
        forks_count,
        open_issues_count,
        stargazers_count,
        updated_at,
      }: RepoData,
      starred: boolean = false,
    ) => {
      reposStore.setPartialRow(TABLE_ID, full_name, {
        owner: owner.login,
        name,
        createdAt: created_at ?? '',
        fork,
        forksCount: forks_count ?? 0,
        openIssuesCount: open_issues_count ?? 0,
        stargazersCount: stargazers_count ?? 0,
        updatedAt: updated_at ?? '',
      });
      if (starred) {
        reposStore.setCell(TABLE_ID, full_name, 'starred', starred);
      }
    },
    [reposStore],
  );

  const addRepos = useCallback(
    async (response: Promise<{data: RepoData[]}>, starred?: boolean) =>
      (await response).data.forEach((repo) => addRepo(repo, starred)),
    [addRepo],
  );

  useSetTask(
    'fetchReposStarred',
    () =>
      addRepos(
        octokit.rest.activity.listReposStarredByAuthenticatedUser(PER_PAGE),
        true,
      ),
    [addRepos],
    'github',
  );

  useSetTask(
    'fetchReposOwned',
    () => addRepos(octokit.rest.repos.listForAuthenticatedUser(PER_PAGE)),
    [addRepos],
    'github',
  );

  useSetTask(
    'fetchReposForOrg',
    (org: string = '') =>
      addRepos(octokit.rest.repos.listForOrg({org, ...PER_PAGE})),
    [addRepos],
    'github',
  );

  useSetTask(
    'fetchOrgs',
    async (_arg, _abort, {manager}) =>
      (await octokit.rest.orgs.listForAuthenticatedUser(PER_PAGE)).data.forEach(
        ({login}, i) =>
          manager.scheduleTaskRun('fetchReposForOrg', login, i * 100),
      ),
    [addRepos],
    'github',
  );

  useSetTask(
    'fetchRepos',
    async (_arg, _abort, {manager}) => {
      manager.scheduleTaskRun({taskId: 'fetchReposStarred', startAfter: 0});
      manager.scheduleTaskRun({taskId: 'fetchReposOwned', startAfter: 100});
      manager.scheduleTaskRun({taskId: 'fetchOrgs', startAfter: 200});
    },
    [],
    'github',
    {repeatDelay: REFRESH_DELAY},
  );
  useScheduleTaskRun('fetchRepos');
};
