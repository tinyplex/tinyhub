/** @jsx createElement */
/** @jsxFrag Fragment */

import {Collapsible, Hr} from 'tinywidgets';
import {Fragment, createElement} from '../../common';
import {IssuesSort} from '../Repo/Issues/IssuesSort';
import {RepoGroups} from './RepoGroups';
import {ReposSort} from './ReposSort';
import {Settings} from 'lucide-react';

export const SideNav = () => (
  <>
    <RepoGroups />
    <Hr />
    <Collapsible icon={Settings} label="Settings">
      <ReposSort />
      <IssuesSort />
    </Collapsible>
  </>
);
