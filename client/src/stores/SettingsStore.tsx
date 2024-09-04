import {
  useCreatePersister,
  useCreateStore,
  useProvideStore,
} from 'tinybase/ui-react';
import {createLocalPersister} from 'tinybase/persisters/persister-browser';
import {createStore} from 'tinybase';

export const SETTINGS_STORE = 'settings';

export const REPOS_SORT_CELL_VALUE = 'reposSortCell';
export const ISSUES_SORT_CELL_VALUE = 'issuesSortCell';

export const SettingsStore = () => {
  const settingsStore = useCreateStore(createStore);
  useCreatePersister(
    settingsStore,
    (settingsStore) => createLocalPersister(settingsStore, SETTINGS_STORE),
    [],
    async (persister) => {
      await persister.startAutoLoad();
      await persister.startAutoSave();
    },
  );

  useProvideStore(SETTINGS_STORE, settingsStore);
  return null;
};
