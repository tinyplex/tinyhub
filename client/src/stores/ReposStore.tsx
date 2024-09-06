import * as UiReact from 'tinybase/ui-react/with-schemas';
import {
  type Id,
  type NoValuesSchema,
  type Store,
  type Table,
  createIndexes,
  createStore,
} from 'tinybase/with-schemas';
import {PER_PAGE, REFRESH_INTERVAL} from './common';
import {hasToken, octokit} from './octokit';
import {createCustomPersister} from 'tinybase/persisters/with-schemas';
import {createLocalPersister} from 'tinybase/persisters/persister-browser/with-schemas';
import {useSettingsValue} from './SettingsStore';

type AsId<Key> = Exclude<Key & Id, number>;

type RepoData = {
  full_name: string;
  owner: {login: string; avatar_url: string};
  name: string;
  archived?: boolean;
  created_at?: string | null;
  description: string | null;
  disabled?: boolean;
  fork: boolean;
  forks_count?: number;
  homepage?: string | null;
  language?: string | null;
  license?: {name?: string} | null;
  open_issues_count?: number;
  size?: number;
  stargazers_count?: number;
  topics?: string[];
  updated_at?: string | null;
  visibility?: string;
};

const STORE_ID = 'repos';
const TABLE_ID = 'repos';

const INDEXES_ID = 'repos';
const INDEX_ID = 'reposByGroup';

const TABLES_SCHEMA = {
  repos: {
    group: {type: 'string', default: ''},
    owner: {type: 'string', default: ''},
    avatarUrl: {type: 'string', default: ''},
    name: {type: 'string', default: ''},
    archived: {type: 'boolean', default: false},
    createdAt: {type: 'string', default: ''},
    description: {type: 'string', default: ''},
    disabled: {type: 'boolean', default: false},
    fork: {type: 'boolean', default: false},
    forksCount: {type: 'number', default: 0},
    homepage: {type: 'string', default: ''},
    language: {type: 'string', default: ''},
    license: {type: 'string', default: ''},
    openIssuesCount: {type: 'number', default: 0},
    size: {type: 'number', default: 0},
    stargazersCount: {type: 'number', default: 0},
    topics: {type: 'string', default: ''},
    updatedAt: {type: 'string', default: ''},
    visibility: {type: 'string', default: ''},
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

export const ReposStore = () => {
  const reposStore = useCreateStore(() =>
    createStore().setTablesSchema(TABLES_SCHEMA),
  );

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
        'group',
        reposSortCell,
        undefined,
        (cell1, cell2) => (cell1 > cell2 ? 1 : -1) * reposSortDirection,
      ),
    [reposSortCell],
  );

  useCreatePersister(
    reposStore,
    (reposStore) => createLocalPersister(reposStore, STORE_ID),
    [],
    async (persister) => {
      await persister.startAutoLoad();
      await persister.startAutoSave();
    },
  );

  useCreatePersister(
    reposStore,
    (reposStore) => {
      return createGithubReposLoadingPersister(reposStore);
    },
    [],
    async (persister) => {
      await persister?.load();
    },
    [],
  );

  useProvideStore(STORE_ID, reposStore);
  useProvideIndexes(INDEXES_ID, reposIndexes!);
  return null;
};

const createGithubReposLoadingPersister = (store: Store<Schemas>) =>
  createCustomPersister(
    store,
    async () => {
      if (hasToken()) {
        const repos: Table<Schemas[0], typeof TABLE_ID> = {};

        const addRepo = (
          {
            full_name,
            owner,
            name,
            archived,
            created_at,
            description,
            disabled,
            fork,
            forks_count,
            homepage,
            language,
            license,
            open_issues_count,
            size,
            stargazers_count,
            topics,
            updated_at,
            visibility,
          }: RepoData,
          group: string = owner.login,
        ) => {
          repos[full_name] = {
            group,
            owner: owner.login,
            avatarUrl: owner.avatar_url,
            name,
            archived: archived ?? false,
            createdAt: created_at ?? '',
            description: description ?? '',
            disabled: disabled ?? false,
            fork,
            forksCount: forks_count ?? 0,
            homepage: homepage ?? '',
            language: language ?? '',
            license: license?.name ?? '',
            openIssuesCount: open_issues_count ?? 0,
            size: size ?? 0,
            stargazersCount: stargazers_count ?? 0,
            topics: topics?.join(', ') ?? '',
            updatedAt: updated_at ?? '',
            visibility: visibility ?? '',
          };
        };

        (
          await octokit.rest.activity.listReposStarredByAuthenticatedUser(
            PER_PAGE,
          )
        ).data.forEach((repo) => addRepo(repo, 'Starred'));

        (
          await octokit.rest.repos.listForAuthenticatedUser(PER_PAGE)
        ).data.forEach((repo) => addRepo(repo));

        await Promise.all(
          (await octokit.rest.orgs.listForAuthenticatedUser(PER_PAGE)).data.map(
            async ({login}) => {
              const repos = await octokit.rest.repos.listForOrg({
                org: login,
                ...PER_PAGE,
              });
              repos.data.forEach((repo) => addRepo(repo));
            },
          ),
        );

        return [{repos}, {}];
      }
      return [{}, {}];
    },
    async () => {},
    (listener) => setInterval(listener, REFRESH_INTERVAL),
    (intervalId) => clearInterval(intervalId),
  );
