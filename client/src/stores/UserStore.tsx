import {useCreateStore, useProvideStore} from 'tinybase/debug/ui-react';
import {createStore} from 'tinybase/debug';
import {octokit} from './octokit';
import {useEffect} from 'react';

export const USER_STORE = 'user';

export const HAS_TOKEN_VALUE = 'hasToken';
export const NAME_VALUE = 'name';
export const AVATAR_URL_VALUE = 'avatarUrl';

export const UserStore = () => {
  const userStore = useCreateStore(createStore);

  useEffect(() => {
    (async () => {
      userStore.setValue(
        HAS_TOKEN_VALUE,
        ((await octokit.auth()) as any).token != null,
      );
      try {
        const response = await octokit.rest.users.getAuthenticated();
        const {name, login, avatar_url} = response.data;
        userStore.setPartialValues({
          [NAME_VALUE]: name ?? login,
          [AVATAR_URL_VALUE]: avatar_url,
        });
      } catch {
        userStore.delValues();
        localStorage.removeItem('token');
      }
    })();
  }, [userStore]);

  useProvideStore(USER_STORE, userStore);
  return null;
};
