import {
  REPOS_NAME_CELL,
  REPOS_OWNER_CELL,
  REPOS_STORE,
  REPOS_TABLE,
} from './ReposStore';
import {
  type Store,
  type Values,
  createCustomPersister,
  createStore,
} from 'tinybase/debug';
import {
  useCell,
  useCreatePersister,
  useCreateStore,
  useProvideStore,
} from 'tinybase/debug/ui-react';
import {REFRESH_INTERVAL} from './common';
import {createLocalPersister} from 'tinybase/debug/persisters/persister-browser';
import {octokit} from './octokit';

export const REPO_STORE = 'repo';

export const OWNER_VALUE = 'owner';
export const REPO_VALUE = 'repo';
export const OWNER_AVATAR_URL_VALUE = 'ownerAvatarUrl';
export const DESCRIPTION_VALUE = 'description';
export const FORK_VALUE = 'fork';
export const HOMEPAGE_VALUE = 'homepage';
export const STARGAZERS_COUNT_VALUE = 'stargazersCount';
export const LANGUAGE_VALUE = 'language';

export const RepoStore = ({repoId}: {readonly repoId: string}) => {
  const owner = useCell(
    REPOS_TABLE,
    repoId,
    REPOS_OWNER_CELL,
    REPOS_STORE,
  ) as string;
  const repo = useCell(
    REPOS_TABLE,
    repoId,
    REPOS_NAME_CELL,
    REPOS_STORE,
  ) as string;

  const repoStore = useCreateStore(createStore, [owner, repo]);
  useCreatePersister(
    repoStore,
    (repoStore) => {
      if (owner && repo) {
        return createLocalPersister(
          repoStore,
          owner + '/' + repo + '/' + REPO_STORE,
        );
      }
    },
    [owner, repo],
    async (persister) => {
      await persister?.startAutoLoad();
      await persister?.startAutoSave();
    },
    [],
  );

  useCreatePersister(
    repoStore,
    (repoStore) => {
      if (owner && repo) {
        return createGithubRepoLoadingPersister(repoStore, owner, repo);
      }
    },
    [owner, repo],
    async (persister) => {
      await persister?.load();
    },
    [],
  );

  useProvideStore(REPO_STORE, repoStore);
  return null;
};

const createGithubRepoLoadingPersister = (
  store: Store,
  owner: string,
  repo: string,
) =>
  createCustomPersister(
    store,
    async () => {
      const response = await octokit.rest.repos.get({owner, repo});
      if (response.status == 200) {
        const {
          owner,
          name,
          description,
          fork,
          homepage,
          stargazers_count,
          language,
        } = response.data;
        return [
          {},
          {
            [OWNER_VALUE]: owner.login,
            [REPO_VALUE]: name,
            [OWNER_AVATAR_URL_VALUE]: owner.avatar_url,
            [DESCRIPTION_VALUE]: description,
            [FORK_VALUE]: fork,
            [HOMEPAGE_VALUE]: homepage,
            [STARGAZERS_COUNT_VALUE]: stargazers_count,
            [LANGUAGE_VALUE]: language,
          } as Values,
        ];
      }
    },
    async () => {},
    (listener) => setInterval(listener, REFRESH_INTERVAL),
    (intervalId) => clearInterval(intervalId),
  );
