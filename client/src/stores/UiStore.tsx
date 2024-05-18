import {useCallback, useEffect} from 'react';
import {
  useCreatePersister,
  useCreateStore,
  useProvideStore,
  useValueListener,
} from 'tinybase/debug/ui-react';
import {createLocalPersister} from 'tinybase/debug/persisters/persister-browser';
import {createStore} from 'tinybase/debug';

export const UI_STORE = 'ui';

export const REPO_ID = 'repoId';
export const DARK_MODE = 'darkMode';
export const AUTO = 'auto';
export const DARK = 'dark';
export const LIGHT = 'light';

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

  const handleHash = useCallback(
    () => uiStore.setValue(REPO_ID, decodeURIComponent(location.hash.slice(1))),
    [uiStore],
  );
  useEffect(() => {
    handleHash();
    addEventListener('hashchange', handleHash);
    return () => removeEventListener('hashchange', handleHash);
  }, [handleHash]);
  useValueListener(
    REPO_ID,
    (_, _valueId, repoId) =>
      history.replaceState(null, '', '#' + encodeURIComponent(repoId ?? '')),
    [],
    false,
    uiStore,
  );

  useProvideStore(UI_STORE, uiStore);
  return null;
};
