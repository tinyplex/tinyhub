import './index.css.ts';
import {UserStore, useUserValue} from '../stores/UserStore.tsx';
import {ViewStore, useUiValue} from '../stores/ViewStore.tsx';
import {App as AppBase} from '../../../../tinywidgets/package/src/index.ts';
import {Auth} from './Auth.tsx';
import {Home} from './Home/index.tsx';
import {Inspector} from 'tinybase/ui-react-inspector';
import {IssuesStore} from '../stores/IssuesStore.tsx';
import {Provider} from 'tinybase/ui-react';
import React from 'react';
import {Repo} from './Repo/index.tsx';
import {RepoStore} from '../stores/RepoStore.tsx';
import {ReposStore} from '../stores/ReposStore.tsx';
import {SettingsStore} from '../stores/SettingsStore.tsx';
import {SideNav} from './SideNav/index.tsx';
import {Title} from './Title.tsx';
import {Welcome} from './Welcome.tsx';

export const App = () => {
  return (
    <Provider>
      <UserStore />
      <ReposStore />
      <RepoStore />
      <IssuesStore />
      <ViewStore />
      <SettingsStore />
      <Layout />
      <Inspector />
    </Provider>
  );
};

export const Layout = () => {
  const name = useUserValue('name');
  const repoId = useUiValue('repoId');
  return (
    <AppBase
      title={<Title />}
      topNavRight={<Auth />}
      sideNav={name ? <SideNav /> : null}
      main={name ? repoId ? <Repo /> : <Home /> : <Welcome />}
    />
  );
};
