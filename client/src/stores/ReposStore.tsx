import {
  type Store,
  type Table,
  createCustomPersister,
  createStore,
} from 'tinybase/debug';
import {hasToken, octokit} from './octokit';
import {
  useCreatePersister,
  useCreateStore,
  useProvideStore,
} from 'tinybase/debug/ui-react';
import {REFRESH_INTERVAL} from './common';
import {createLocalPersister} from 'tinybase/debug/persisters/persister-browser';

type RepoData = {
  full_name: string;
  owner: {login: string};
  name: string;
  fork: boolean;
  stargazers_count?: number;
};

export const REPOS_STORE = 'repos';

export const GROUPS_TABLE = 'groups';
export const GROUPS_NAME_CELL = 'name';

export const REPOS_TABLE = 'repos';
export const REPOS_GROUP_CELL = 'group';
export const REPOS_OWNER_CELL = 'owner';
export const REPOS_NAME_CELL = 'name';
export const REPOS_FORK_CELL = 'fork';
export const REPOS_STARGAZERS_COUNT_CELL = 'stargazersCount';

export const STARRED_GROUP = 'Starred';

export const ReposStore = () => {
  const reposStore = useCreateStore(createStore);
  useCreatePersister(
    reposStore,
    (reposStore) => createLocalPersister(reposStore, REPOS_STORE),
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

  useProvideStore(REPOS_STORE, reposStore);
  return null;
};
const PER_PAGE = {per_page: 100};

const createGithubReposLoadingPersister = (store: Store) =>
  createCustomPersister(
    store,
    async () => {
      if (hasToken()) {
        const reposTable: Table = {};

        const updateTables = (
          {full_name, owner, name, fork, stargazers_count}: RepoData,
          group: string = owner.login,
        ) => {
          reposTable[full_name] = {
            [REPOS_GROUP_CELL]: group,
            [REPOS_OWNER_CELL]: owner.login,
            [REPOS_NAME_CELL]: name,
            [REPOS_FORK_CELL]: fork,
            [REPOS_STARGAZERS_COUNT_CELL]: stargazers_count ?? 0,
          };
        };

        (
          await octokit.rest.activity.listReposStarredByAuthenticatedUser(
            PER_PAGE,
          )
        ).data.forEach((repo) => updateTables(repo, STARRED_GROUP));

        (
          await octokit.rest.repos.listForAuthenticatedUser(PER_PAGE)
        ).data.forEach((repo) => updateTables(repo));

        await Promise.all(
          (await octokit.rest.orgs.listForAuthenticatedUser(PER_PAGE)).data.map(
            async ({login}) => {
              const repos = await octokit.rest.repos.listForOrg({
                org: login,
                ...PER_PAGE,
              });
              repos.data.forEach((repo) => updateTables(repo));
            },
          ),
        );

        return [{[REPOS_TABLE]: reposTable}, {}];
      }
      return [{}, {}];
    },
    async () => {},
    (listener) => setInterval(listener, REFRESH_INTERVAL),
    (intervalId) => clearInterval(intervalId),
  );
