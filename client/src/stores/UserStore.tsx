import {
  type Store,
  type Values,
  createCustomPersister,
  createStore,
} from 'tinybase';
import {hasToken, octokit} from './octokit';
import {
  useCreatePersister,
  useCreateStore,
  useProvideStore,
} from 'tinybase/ui-react';
import {REFRESH_INTERVAL} from './common';
import {createLocalPersister} from 'tinybase/persisters/persister-browser';

export const USER_STORE = 'user';

export const NAME_VALUE = 'name';
export const AVATAR_URL_VALUE = 'avatarUrl';

export const UserStore = () => {
  const userStore = useCreateStore(createStore);
  useCreatePersister(
    userStore,
    (userStore) => createLocalPersister(userStore, USER_STORE),
    [],
    async (persister) => {
      await persister.startAutoLoad();
      await persister.startAutoSave();
    },
  );

  useCreatePersister(
    userStore,
    createGithubAuthenticatedUserLoadingPersister,
    [],
    async (persister) => {
      await persister?.load();
    },
    [],
  );

  useProvideStore(USER_STORE, userStore);
  return null;
};

const createGithubAuthenticatedUserLoadingPersister = (store: Store) =>
  createCustomPersister(
    store,
    async () => {
      if (hasToken()) {
        const response = await octokit.rest.users.getAuthenticated();
        if (response.status == 200) {
          const {name, login, avatar_url} = response.data;
          return [
            {},
            {
              [NAME_VALUE]: name ?? login,
              [AVATAR_URL_VALUE]: avatar_url,
            } as Values,
          ];
        }
      }
      return [{}, {}];
    },
    async () => {},
    (listener) => setInterval(listener, REFRESH_INTERVAL),
    (intervalId) => clearInterval(intervalId),
  );
