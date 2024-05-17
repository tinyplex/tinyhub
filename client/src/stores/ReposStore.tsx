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

export const REPOS_STORE = 'repos';

export const ORGS_TABLE = 'orgs';
export const ORGS_NAME_CELL = 'name';

export const REPOS_TABLE = 'repos';
export const REPOS_OWNER_CELL = 'owner';
export const REPOS_REPO_CELL = 'repo';

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
        const orgsTable: Table = {};
        const reposTable: Table = {};

        (
          await octokit.rest.repos.listForAuthenticatedUser(PER_PAGE)
        ).data.forEach(
          ({full_name, owner, name}) =>
            (reposTable[full_name] = {
              [REPOS_OWNER_CELL]: owner.login,
              [REPOS_REPO_CELL]: name,
            }),
        );

        await Promise.all(
          (await octokit.rest.orgs.listForAuthenticatedUser(PER_PAGE)).data.map(
            async ({login}) => {
              orgsTable[login] = {[ORGS_NAME_CELL]: login};
              const repos = await octokit.rest.repos.listForOrg({
                org: login,
                ...PER_PAGE,
              });
              repos.data.forEach(
                ({full_name, owner, name}) =>
                  (reposTable[full_name] = {
                    [REPOS_OWNER_CELL]: owner.login,
                    [REPOS_REPO_CELL]: name,
                  }),
              );
            },
          ),
        );

        return [{[REPOS_TABLE]: reposTable, [ORGS_TABLE]: orgsTable}, {}];
      }
      return [{}, {}];
    },
    async () => {},
    (listener) => setInterval(listener, REFRESH_INTERVAL),
    (intervalId) => clearInterval(intervalId),
  );
