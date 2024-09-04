/** @jsx createElement */

import {Auth} from './Auth';
import React from 'react';
import {Repo} from './Repo';
import {SideNav} from './SideNav';
import {Title} from './Title';
import {USER_STORE} from '../stores/UserStore';
import {Ui as UiBase} from 'tinywidgets';
import {Welcome} from './Welcome';
import {useHasValues} from 'tinybase/ui-react';

const {createElement} = React;

export const Ui = () => {
  const hasUser = useHasValues(USER_STORE);
  return (
    <UiBase
      title={<Title />}
      topNavRight={<Auth />}
      sideNav={hasUser ? <SideNav /> : null}
      article={hasUser ? <Repo /> : <Welcome />}
      // footer={<Footer />}
    />
  );
};
