import {DarkMode} from './DarkMode';
import {Header} from './header/Header';
import {Main} from './Main';
import {Provider} from 'tinybase/debug/ui-react';
import React from 'react';
import {ReposStore} from '../stores/ReposStore';
import {StoreInspector} from 'tinybase/debug/ui-react-dom';
import {UiStore} from '../stores/UiStore';
import {UserStore} from '../stores/UserStore';

export const App = () => {
  return (
    <DarkMode>
      <Provider>
        <UserStore />
        <ReposStore />
        <UiStore />

        <Header />
        <Main />
        <StoreInspector />
      </Provider>
    </DarkMode>
  );
};
