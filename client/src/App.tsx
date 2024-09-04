/** @jsx createElement */

import {Provider} from 'tinybase/ui-react';
import {ReposStore} from './stores/ReposStore';
import {Ui} from './ui';
import {UiStore} from './stores/UiStore';
import {UserStore} from './stores/UserStore';
import {createElement} from './common';

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
