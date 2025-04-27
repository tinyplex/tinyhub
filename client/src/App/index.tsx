import {Provider as TinyBaseProvider} from 'tinybase/ui-react';
import {Inspector} from 'tinybase/ui-react-inspector';
import {createManager} from 'tinytick';
import {
  Provider as TinyTickProvider,
  useCreateManager,
} from 'tinytick/ui-react';
import {App as AppBase} from 'tinywidgets';
import {IssuesStore} from '../stores/IssuesStore.tsx';
import {RepoStore} from '../stores/RepoStore.tsx';
import {ReposStore} from '../stores/ReposStore.tsx';
import {SettingsStore} from '../stores/SettingsStore.tsx';
import {UserStore, useUserValue} from '../stores/UserStore.tsx';
import {ViewStore, useUiValue} from '../stores/ViewStore.tsx';
import {Auth} from './Auth.tsx';
import {Footer} from './Footer.tsx';
import {Home} from './Home/index.tsx';
import {Repo} from './Repo/index.tsx';
import {SideNav} from './SideNav/index.tsx';
import {Title} from './Title.tsx';
import {Welcome} from './Welcome.tsx';
import './index.css.ts';

export const App = () => (
  <TinyTickProvider manager={useTaskManager()}>
    <TinyBaseProvider>
      <UserStore />
      <ReposStore />
      <RepoStore />
      <IssuesStore />
      <ViewStore />
      <SettingsStore />
      <Layout />
      <Inspector />
    </TinyBaseProvider>
  </TinyTickProvider>
);

const Layout = () => {
  const name = useUserValue('name');
  const repoId = useUiValue('repoId');
  return (
    <AppBase
      title={<Title />}
      topNavRight={<Auth />}
      sideNav={name ? <SideNav /> : null}
      main={name ? repoId ? <Repo /> : <Home /> : <Welcome />}
      footer={Footer}
    />
  );
};

const useTaskManager = () =>
  useCreateManager(() => {
    const manager = createManager();
    manager.start();
    return manager;
  });
