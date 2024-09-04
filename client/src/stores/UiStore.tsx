import {
  useCreatePersister,
  useCreateStore,
  useProvideStore,
} from 'tinybase/ui-react';
import {createLocalPersister} from 'tinybase/persisters/persister-browser';
import {createStore} from 'tinybase';

export const UI_STORE = 'ui';

export const REPOS_SORT_CELL_VALUE = 'reposSortCell';
export const REPO_ID_VALUE = 'repoId';
export const ISSUES_SORT_CELL_VALUE = 'issuesSortCell';
export const ISSUE_ID_VALUE = 'issueId';

export const UiStore = () => {
  const uiStore = useCreateStore(createStore);
  useCreatePersister(
    uiStore,
    (uiStore) => createLocalPersister(uiStore, UI_STORE),
    [],
    async (persister) => {
      await persister.startAutoLoad();
      await persister.startAutoSave();
    },
  );

  useProvideStore(UI_STORE, uiStore);
  return null;
};
