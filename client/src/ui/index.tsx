/** @jsx createElement */
/** @jsxFrag Fragment */

import {Fragment, createElement} from './common';
import {Auth} from './Auth';
import {Inspector} from 'tinybase/ui-react-inspector';
import {Repo} from './Repo';
import {SideNav} from './SideNav';
import {Title} from './Title';
import {USER_STORE} from '../stores/UserStore';
import {Ui as UiBase} from 'tinywidgets';
import {Welcome} from './Welcome';
import {useHasValues} from 'tinybase/ui-react';

export const Ui = () => {
  const hasUser = useHasValues(USER_STORE);
  return (
    <>
      <UiBase
        title={<Title />}
        topNavRight={<Auth />}
        sideNav={hasUser ? <SideNav /> : null}
        article={hasUser ? <Repo /> : <Welcome />}
      />
      <Inspector />
    </>
  );
};
