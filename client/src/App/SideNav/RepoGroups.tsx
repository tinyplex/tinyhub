import React from 'react';
import {RepoGroup} from './RepoGroup';
import {useGroupIds} from '../../stores/ReposStore';
import {useUiValue} from '../../stores/ViewStore';

export const RepoGroups = () => {
  const currentRepoId = useUiValue('repoId');

  return useGroupIds().map((group) => (
    <RepoGroup group={group} currentRepoId={currentRepoId} key={group} />
  ));
};
