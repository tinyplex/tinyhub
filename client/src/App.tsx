/** @jsx createElement */

import {Provider} from 'tinybase/ui-react';
import React from 'react';
import {ReposStore} from './stores/ReposStore';
import {Ui} from './ui';
import {UiStore} from './stores/UiStore';
import {UserStore} from './stores/UserStore';

const {createElement} = React;

export const App = () => {
  return (
    <Provider>
      <UserStore />
      <ReposStore />
      <UiStore />
      <Ui />
    </Provider>
  );
};
