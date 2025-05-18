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
import {
  getNextPage,
  getPageOptions,
  hasToken,
  HeadersWithLink,
  octokit,
  STAGGER,
} from './octokit';
import {useSettingsValue} from './SettingsStore';

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
    stale: {type: 'boolean', default: false},
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
        (slice1, slice2) =>
          slice1 == 'Starred'
            ? -1
            : slice2 == 'Starred'
              ? 1
              : slice1 > slice2
                ? 1
                : -1,
        (cell1, cell2) => (cell1 > cell2 ? 1 : -1) * reposSortDirection,
      ),
    [reposSortCell],
  );
  useProvideIndexes(INDEXES_ID, reposIndexes!);

  useCreatePersister(
    reposStore,
    (reposStore) => createLocalPersister(reposStore, STORE_ID),
    [],
    (persister) => persister.startAutoPersisting(),
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
      if (starred || reposStore.getCell(TABLE_ID, full_name, 'stale')) {
        reposStore.setCell(TABLE_ID, full_name, 'starred', starred);
      }
      reposStore.setPartialRow(TABLE_ID, full_name, {
        owner: owner.login,
        name,
        createdAt: created_at ?? '',
        fork,
        forksCount: forks_count ?? 0,
        openIssuesCount: open_issues_count ?? 0,
        stargazersCount: stargazers_count ?? 0,
        updatedAt: updated_at ?? '',
        stale: false,
      });
    },
    [reposStore],
  );

  const addRepos = useCallback(
    async (
      responsePromise: Promise<{data: RepoData[]; headers: HeadersWithLink}>,
      starred?: boolean,
    ) => {
      const response = await responsePromise;
      response.data.forEach((repo) => addRepo(repo, starred));
      return getNextPage(response);
    },
    [addRepo],
  );

  useSetTask(
    'fetchReposStarred',
    async (page = '1', _signal, {manager, taskId}) => {
      if (hasToken()) {
        const nextPage = await addRepos(
          octokit.rest.activity.listReposStarredByAuthenticatedUser(
            getPageOptions(page),
          ),
          true,
        );
        if (nextPage) {
          await manager.untilTaskRunDone(
            manager.scheduleTaskRun(taskId, nextPage, STAGGER)!,
          );
        }
      }
    },
    [addRepos],
    'multiFetch',
  );

  useSetTask(
    'fetchReposOwned',
    async (page = '1', _signal, {manager, taskId}) => {
      if (hasToken()) {
        const nextPage = await addRepos(
          octokit.rest.repos.listForAuthenticatedUser(getPageOptions(page)),
        );
        if (nextPage) {
          await manager.untilTaskRunDone(
            manager.scheduleTaskRun(taskId, nextPage, STAGGER)!,
          );
        }
      }
    },
    [addRepos],
    'multiFetch',
  );

  useSetTask(
    'fetchReposForOrg',
    async (orgAndPage: string = '[""]', _signal, {manager, taskId}) => {
      if (hasToken()) {
        const [org, page = '1'] = JSON.parse(orgAndPage);
        const nextPage = await addRepos(
          octokit.rest.repos.listForOrg({org, ...getPageOptions(page)}),
        );
        if (nextPage) {
          await manager.untilTaskRunDone(
            manager.scheduleTaskRun(
              taskId,
              JSON.stringify([org, nextPage]),
              STAGGER,
            )!,
          );
        }
      }
    },
    [addRepos],
    'multiFetch',
  );

  useSetTask(
    'fetchOrgs',
    async (page: string | undefined, _abort, {manager, taskId}) => {
      if (hasToken()) {
        const response = await octokit.rest.orgs.listForAuthenticatedUser(
          getPageOptions(page),
        );
        const nextPage = getNextPage(response);
        if (nextPage) {
          await manager.untilTaskRunDone(
            manager.scheduleTaskRun(taskId, nextPage, STAGGER)!,
          );
        }

        await Promise.all(
          response.data.map(({login}, i) =>
            manager.untilTaskRunDone(
              manager.scheduleTaskRun(
                'fetchReposForOrg',
                JSON.stringify([login]),
                i * STAGGER,
              )!,
            ),
          ),
        );
      }
    },
    [addRepos],
    'multiFetch',
  );

  useSetTask(
    'fetchRepos',
    async (_arg, _signal, {manager}) => {
      reposStore.forEachRow(TABLE_ID, (repoId, _) =>
        reposStore.setCell(TABLE_ID, repoId, 'stale', true),
      );

      if (hasToken()) {
        await Promise.all(
          ['fetchReposStarred', 'fetchReposOwned', 'fetchOrgs'].map(
            (taskId, i) =>
              manager.untilTaskRunDone(
                manager.scheduleTaskRun({taskId, startAfter: i * STAGGER})!,
              ),
          ),
        );
      }

      reposStore.forEachRow(TABLE_ID, (repoId, _) => {
        if (reposStore.getCell(TABLE_ID, repoId, 'stale')) {
          reposStore.delRow(TABLE_ID, repoId);
        }
      });
    },
    [reposStore],
    'multiFetch',
    {repeatDelay: REFRESH_DELAY},
  );

  useScheduleTaskRun('fetchRepos');
};
