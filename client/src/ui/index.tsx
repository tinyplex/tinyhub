/** @jsx createElement */
/** @jsxFrag Fragment */

import {Fragment, createElement} from './common';
import {Auth} from './Auth';
import {Inspector} from 'tinybase/ui-react-inspector';
import {Repo} from './Repo';
import {SideNav} from './SideNav';
import {Title} from './Title';
import {Ui as UiBase} from 'tinywidgets';
import {Welcome} from './Welcome';
import {useUserValue} from '../stores/UserStore';

export const Ui = () => {
  const name = useUserValue('name');
  return (
    <>
      <UiBase
        title={<Title />}
        topNavRight={<Auth />}
        sideNav={name ? <SideNav /> : null}
        article={name ? <Repo /> : <Welcome />}
      />
      <Inspector />
    </>
  );
};
