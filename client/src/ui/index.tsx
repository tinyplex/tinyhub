/** @jsx createElement */
/** @jsxFrag Fragment */

import {Auth} from './Auth';
import {Repo} from './Repo';
import {SideNav} from './SideNav';
import {Title} from './Title';
import {Ui as UiBase} from 'tinywidgets';
import {Welcome} from './Welcome';
import {createElement} from '../common';
import {useUserValue} from '../stores/UserStore';

export const Ui = () => {
  const name = useUserValue('name');
  return (
    <UiBase
      title={<Title />}
      topNavRight={<Auth />}
      sideNav={name ? <SideNav /> : null}
      article={name ? <Repo /> : <Welcome />}
    />
  );
};
