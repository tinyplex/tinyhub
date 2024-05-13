import {Header} from './Header';
import {Main} from './Main';
import {Provider} from 'tinybase/debug/ui-react';
import React from 'react';
import {ReposStore} from '../stores/ReposStore';
import {StoreInspector} from 'tinybase/debug/ui-react-dom';
import {UiStore} from '../stores/UiStore';

export const App = () => {
  return (
    <Provider>
      <ReposStore />
      <UiStore />

      <Header />
      <Main />
      <StoreInspector />
    </Provider>
  );
};
