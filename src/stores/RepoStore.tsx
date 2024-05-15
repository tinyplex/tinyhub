import {REPOS_FULL_NAME_CELL, REPOS_STORE, REPOS_TABLE} from './ReposStore';
import {type Values, createCustomPersister, createStore} from 'tinybase/debug';
import {
  useCell,
  useCreatePersister,
  useCreateStore,
  useProvideStore,
} from 'tinybase/debug/ui-react';
import {createLocalPersister} from 'tinybase/debug/persisters/persister-browser';

export const REPO_STORE = 'repo';

export const FULL_NAME_VALUE = 'fullName';
export const OWNER_VALUE = 'owner';
export const OWNER_AVATAR_VALUE = 'ownerAvatar';
export const DESCRIPTION_VALUE = 'description';
export const FORK_VALUE = 'fork';
export const HOMEPAGE_VALUE = 'homepage';
export const STARGAZERS_VALUE = 'stargazers';
export const LANGUAGE_VALUE = 'language';

export const REFRESH_INTERVAL = 60000;

export const RepoStore = ({repoId}: {readonly repoId: string}) => {
  const repoFullName = useCell(
    REPOS_TABLE,
    repoId,
    REPOS_FULL_NAME_CELL,
    REPOS_STORE,
  );

  const repoStore = useCreateStore(createStore);
  useCreatePersister(
    repoStore,
    (repoStore) => createLocalPersister(repoStore, repoId + '/' + REPO_STORE),
    [],
    async (persister) => {
      await persister.startAutoLoad();
      await persister.startAutoSave();
    },
  );

  useCreatePersister(
    repoStore,
    (repoStore) =>
      createCustomPersister(
        repoStore,
        async () => {
          return [
            {},
            {
              [FULL_NAME_VALUE]: repoFullName,
            } as Values,
          ];
        },
        async () => {},
        (listener) => setInterval(listener, REFRESH_INTERVAL),
        (intervalId) => clearInterval(intervalId),
      ),
    [repoFullName],
    async (persister) => {
      await persister.startAutoLoad();
    },
  );

  useProvideStore(REPO_STORE, repoStore);
  return null;
};
