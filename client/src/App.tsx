/** @jsx createElement */

import {Provider} from 'tinybase/ui-react';
import React from 'react';
import {Repo} from './ui/repo/Repo';
import {ReposStore} from './stores/ReposStore';
import {Sidebar} from './ui/sidebar/Sidebar';
import {Title} from './ui/Title';
import {TopNav} from './ui/TopNav';
import {Ui} from 'tinywidgets';
import {UiStore} from './stores/UiStore';
import {UserStore} from './stores/UserStore';

const {createElement} = React;

export const App = () => {
  return (
    <Provider>
      <UserStore />
      <ReposStore />
      <UiStore />
      <Ui
        title={<Title />}
        topNav={<TopNav />}
        sideNav={<Sidebar />}
        article={<Repo />}
        // footer={<Footer />}
      />
    </Provider>
  );
};
