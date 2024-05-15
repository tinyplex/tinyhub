import {
  useCreatePersister,
  useCreateStore,
  useProvideStore,
} from 'tinybase/debug/ui-react';
import {createLocalPersister} from 'tinybase/debug/persisters/persister-browser';
import {createStore} from 'tinybase/debug';

export const REPOS_STORE = 'repos';

export const REPOS_TABLE = 'repos';
export const REPOS_OWNER_CELL = 'owner';
export const REPOS_REPO_CELL = 'repo';

export const ReposStore = () => {
  const reposStore = useCreateStore(createStore);
  useCreatePersister(
    reposStore,
    (repoStore) => createLocalPersister(repoStore, REPOS_STORE),
    [],
    async (persister) => {
      await persister.startAutoLoad();
      await persister.startAutoSave();
    },
  );

  useProvideStore(REPOS_STORE, reposStore);
  return null;
};
