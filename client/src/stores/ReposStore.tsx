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

const createGithubReposLoadingPersister = (store: Store) =>
  createCustomPersister(
    store,
    async () => {
      if (hasToken()) {
        const response = await octokit.rest.repos.listForAuthenticatedUser({
          per_page: 100,
        });
        if (response.status == 200) {
          const reposTable: Table = {};
          response.data.forEach(
            ({full_name, owner, name}) =>
              (reposTable[full_name] = {
                [REPOS_OWNER_CELL]: owner.login,
                [REPOS_REPO_CELL]: name,
              }),
          );
          return [{[REPOS_TABLE]: reposTable}, {}];
        }
      }
      return [{}, {}];
    },
    async () => {},
    (listener) => setInterval(listener, REFRESH_INTERVAL),
    (intervalId) => clearInterval(intervalId),
  );
