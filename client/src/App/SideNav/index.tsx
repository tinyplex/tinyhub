import {Home, Settings} from 'lucide-react';
import React from 'react';
import {Button, Collapsible, Hr} from 'tinywidgets';
import {useSetUiValueCallback, useUiValue} from '../../stores/ViewStore';
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
        title="Home"
        current={!currentRepoId}
      />
      <Hr />
      <RepoGroups />
      <Hr />
      <Collapsible icon={Settings} title="Settings">
        <ReposSort />
        <IssuesSort />
      </Collapsible>
    </>
  );
};
