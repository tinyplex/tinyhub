import {useCallback, useEffect} from 'react';
import {
  useCreatePersister,
  useCreateStore,
  useProvideStore,
  useValueListener,
} from 'tinybase/debug/ui-react';
import {createSessionPersister} from 'tinybase/debug/persisters/persister-browser';
import {createStore} from 'tinybase/debug';

export const UI_STORE = 'ui';

export const REPO_ID = 'repoId';

export const UiStore = () => {
  const uiStore = useCreateStore(createStore);
  useCreatePersister(
    uiStore,
    (uiStore) => createSessionPersister(uiStore, UI_STORE),
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
    (_, _valueId, roomId) =>
      history.replaceState(null, '', '#' + encodeURIComponent(roomId)),
    [],
    false,
    uiStore,
  );

  useProvideStore(UI_STORE, uiStore);
  return null;
};
