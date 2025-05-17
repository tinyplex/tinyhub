import type {DependencyList} from 'react';
import {createLocalPersister} from 'tinybase/persisters/persister-browser/with-schemas';
import * as UiReact from 'tinybase/ui-react/with-schemas';
import {
  type NoTablesSchema,
  type Store,
  type Value,
  createStore,
} from 'tinybase/with-schemas';
import {useScheduleTaskRun, useSetTask} from 'tinytick/ui-react';
import {hasToken, octokit} from './octokit';

const REFRESH_DELAY = 1000 * 60 * 60;

const STORE_ID = 'user';

const VALUES_SCHEMA = {
  name: {type: 'string'},
  avatarUrl: {type: 'string'},
} as const;
type Schemas = [NoTablesSchema, typeof VALUES_SCHEMA];
const {
  useCreateStore,
  useProvideStore,
  useCreatePersister,
  useValue,
  useSetValueCallback,
} = UiReact as UiReact.WithSchemas<Schemas>;
type ValueIds = keyof typeof VALUES_SCHEMA;

export const useUserValue = <ValueId extends ValueIds>(valueId: ValueId) =>
  useValue<ValueId>(valueId, STORE_ID);

export const useSetUserValueCallback = <Parameter, ValueId extends ValueIds>(
  valueId: ValueId,
  getValue: (parameter: Parameter) => Value<Schemas[1], ValueId>,
  getValueDeps?: DependencyList,
) => useSetValueCallback(valueId, getValue, getValueDeps, STORE_ID);

export const UserStore = () => {
  const userStore = useCreateStore(() =>
    createStore().setValuesSchema(VALUES_SCHEMA),
  );
  useCreatePersister(
    userStore,
    (userStore) => createLocalPersister(userStore, STORE_ID),
    [],
    async (persister) => {
      await persister.startAutoLoad();
      await persister.startAutoSave();
    },
  );

  useProvideStore(STORE_ID, userStore);

  useFetch(userStore);

  return null;
};

const useFetch = (userStore: Store<Schemas>) => {
  useSetTask(
    'fetchUser',
    async () => {
      if (hasToken()) {
        const response = await octokit.rest.users.getAuthenticated();
        if (response.status == 200) {
          const {name, login, avatar_url} = response.data;
          userStore.setValues({
            name: name ?? login,
            avatarUrl: avatar_url,
          });
        }
      } else {
        userStore.delValues();
      }
    },
    [userStore],
    'github',
    {repeatDelay: REFRESH_DELAY},
  );
  useScheduleTaskRun({taskId: 'fetchUser'});
};
