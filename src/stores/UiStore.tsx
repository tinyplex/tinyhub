import {useCallback, useEffect} from 'react';
import {
  useCreatePersister,
  useCreateStore,
  useProvideStore,
  useSetValueCallback,
  useValue,
  useValueListener,
} from 'tinybase/debug/ui-react';
import {createSessionPersister} from 'tinybase/debug/persisters/persister-browser';
import {createStore} from 'tinybase';

const UI_STORE_ID = 'ui';

const REPO_ID_VALUE = 'repoId';

export const UiStore = () => {
  const uiStore = useCreateStore(createStore);
  useCreatePersister(
    uiStore,
    (uiStore) => createSessionPersister(uiStore, UI_STORE_ID),
    [],
    async (persister) => {
      await persister.startAutoLoad();
      await persister.startAutoSave();
    },
  );

  const handleHash = useCallback(
    () =>
      uiStore.setValue(
        REPO_ID_VALUE,
        decodeURIComponent(location.hash.slice(1)),
      ),
    [uiStore],
  );
  useEffect(() => {
    handleHash();
    addEventListener('hashchange', handleHash);
    return () => removeEventListener('hashchange', handleHash);
  }, [handleHash]);
  useValueListener(
    REPO_ID_VALUE,
    (_, _valueId, roomId) =>
      history.replaceState(null, '', '#' + encodeURIComponent(roomId)),
    [],
    false,
    uiStore,
  );

  useProvideStore(UI_STORE_ID, uiStore);
  return null;
};

export const useUiRepoId = () => useValue(REPO_ID_VALUE, UI_STORE_ID) as string;

export const useUiSetRepoId = (repoId: string) =>
  useSetValueCallback(REPO_ID_VALUE, () => repoId, [repoId], UI_STORE_ID);
