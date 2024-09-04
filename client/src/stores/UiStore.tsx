import * as UiReact from 'tinybase/ui-react/with-schemas';
import {
  type NoTablesSchema,
  type Value,
  createStore,
} from 'tinybase/with-schemas';
import {createLocalPersister} from 'tinybase/persisters/persister-browser/with-schemas';

const STORE_ID = 'ui';

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
  getValueDeps?: React.DependencyList,
) => useSetValueCallback(valueId, getValue, getValueDeps, STORE_ID);

export const UiStore = () => {
  const uiStore = useCreateStore(() =>
    createStore().setValuesSchema(VALUES_SCHEMA),
  );
  useCreatePersister(
    uiStore,
    (uiStore) => createLocalPersister(uiStore, STORE_ID),
    [],
    async (persister) => {
      await persister.startAutoLoad();
      await persister.startAutoSave();
    },
  );

  useProvideStore(STORE_ID, uiStore);
  return null;
};
