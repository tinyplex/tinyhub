/** @jsx createElement */
/** @jsxFrag Fragment */

import {Button, Collapsible, Hr} from 'tinywidgets';
import {Fragment, createElement} from '../../common';
import {Home, Settings} from 'lucide-react';
import {useSetUiValueCallback, useUiValue} from '../../stores/UiStore';
import {IssuesSort} from '../Repo/Issues/IssuesSort';
import {RepoGroups} from './RepoGroups';
import {ReposSort} from './ReposSort';

export const SideNav = () => {
  const currentRepoId = useUiValue('repoId');
  const handleClick = useSetUiValueCallback('repoId', () => '');

  return (
    <>
      <Button
        variant="item"
        onClick={handleClick}
        icon={Home}
        label="Home"
        current={!currentRepoId}
      />
      <Hr />
      <RepoGroups />
      <Hr />
      <Collapsible icon={Settings} label="Settings">
        <ReposSort />
        <IssuesSort />
      </Collapsible>
    </>
  );
};
