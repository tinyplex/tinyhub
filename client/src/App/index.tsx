/** @jsx createElement */
/** @jsxFrag Fragment */

import {Fragment, createElement} from '../common.ts';
import {App as AppBase} from 'tinywidgets';
import {Inspector} from 'tinybase/ui-react-inspector';
import {IssuesStore} from '../stores/IssuesStore.tsx';
import {RepoStore} from '../stores/RepoStore.tsx';
import {ReposStore} from '../stores/ReposStore';
import {SettingsStore} from '../stores/SettingsStore';
import {Ui} from '../Ui/index.tsx';
import {UserStore} from '../stores/UserStore';
import {ViewStore} from '../stores/ViewStore.tsx';

export const App = () => {
  return (
    <AppBase
      ui={
        <>
          <Ui />
          <Inspector />
        </>
      }
      stores={
        <>
          <UserStore />
          <ReposStore />
          <RepoStore />
          <IssuesStore />
          <ViewStore />
          <SettingsStore />
        </>
      }
    />
  );
};