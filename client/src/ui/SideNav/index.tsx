/** @jsx createElement */
/** @jsxFrag Fragment */

import {Collapsible, Hr} from 'tinywidgets';
import {Fragment, createElement} from '../common';
import {IssuesSort} from '../Repo/Issues/IssuesSort';
import {RepoGroups} from './RepoGroups';
import {ReposSort} from './ReposSort';
import {Settings} from 'lucide-react';
import {USER_STORE} from '../../stores/UserStore';
import {useHasValues} from 'tinybase/ui-react';

export const SideNav = () => {
  const hasUser = useHasValues(USER_STORE);
  return hasUser ? (
    <>
      <RepoGroups />
      <Hr />
      <Collapsible icon={Settings} label="Settings">
        <ReposSort />
        <IssuesSort />
      </Collapsible>
    </>
  ) : null;
};
