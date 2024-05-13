import {Header} from './Header';
import {Main} from './Main';
import {Provider} from 'tinybase/debug/ui-react';
import React from 'react';
import {StoreInspector} from 'tinybase/debug/ui-react-dom';
import {UiStore} from '../stores/UiStore';

export const App = () => {
  return (
    <Provider>
      <UiStore />

      <Header />
      <Main />
      <StoreInspector />
    </Provider>
  );
};
