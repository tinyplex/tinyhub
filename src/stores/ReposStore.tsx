import {
  useCreatePersister,
  useCreateStore,
  useProvideStore,
} from 'tinybase/debug/ui-react';
import {createLocalPersister} from 'tinybase/debug/persisters/persister-browser';
import {createStore} from 'tinybase/debug';

export const REPOS_STORE = 'repos';

export const REPOS_TABLE = 'repos';

export const ReposStore = () => {
  const repoStore = useCreateStore(createStore);
  useCreatePersister(
    repoStore,
    (repoStore) => createLocalPersister(repoStore, REPOS_STORE),
    [],
    async (persister) => {
      await persister.startAutoLoad();
      await persister.startAutoSave();
    },
  );

  useProvideStore(REPOS_STORE, repoStore);
  return null;
};
