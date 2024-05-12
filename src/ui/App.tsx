import {Provider, useCreateStore} from 'tinybase/debug/ui-react';
import {Button} from './Button';
import React from 'react';
import {StoreInspector} from 'tinybase/debug/ui-react-dom';
import {createStore} from 'tinybase/debug';

export const App = () => {
  const store = useCreateStore(createStore);

  return (
    <Provider store={store}>
      It works.
      <Button />
      <StoreInspector />
    </Provider>
  );
};
