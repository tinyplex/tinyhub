import * as UiReact from 'tinybase/ui-react/with-schemas';
import {
  type NoTablesSchema,
  type Value,
  createStore,
} from 'tinybase/with-schemas';
import type {DependencyList} from 'react';
import {createCustomPersister} from 'tinybase/persisters/with-schemas';

const STORE_ID = 'view';

const VALUES_SCHEMA = {
  repoId: {type: 'string', default: ''},
  issueId: {type: 'string', default: ''},
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

export const useUiValue = <ValueId extends ValueIds>(valueId: ValueId) =>
  useValue<ValueId>(valueId, STORE_ID);

export const useSetUiValueCallback = <Parameter, ValueId extends ValueIds>(
  valueId: ValueId,
  getValue: (parameter: Parameter) => Value<Schemas[1], ValueId>,
  getValueDeps?: DependencyList,
) => useSetValueCallback(valueId, getValue, getValueDeps, STORE_ID);

export const ViewStore = () => {
  const viewStore = useCreateStore(() =>
    createStore().setValuesSchema(VALUES_SCHEMA),
  );
  useCreatePersister(
    viewStore,
    (viewStore) =>
      createCustomPersister(
        viewStore,
        async () => {
          const [owner, name, issueId] = location.hash.slice(1).split('/');
          return [
            {},
            {repoId: owner && name ? owner + '/' + name : '', issueId},
          ];
        },
        async (getContent) => {
          const {repoId, issueId} = getContent()[1];
          location.hash = repoId + '/' + issueId;
        },
        (listener) => {
          const hashListener = () => listener();
          window.addEventListener('hashchange', hashListener);
          return hashListener;
        },
        (hashListener) =>
          window.removeEventListener('hashchange', hashListener),
      ),
    [],
    async (persister) => {
      await persister.startAutoLoad();
      await persister.startAutoSave();
    },
  );

  useProvideStore(STORE_ID, viewStore);
  return null;
};
