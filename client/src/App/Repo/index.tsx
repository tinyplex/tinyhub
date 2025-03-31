import React from 'react';
import {useRepoValue} from '../../stores/RepoStore';
import {useUiValue} from '../../stores/ViewStore';
import {Issues} from './Issues';
import {RepoHeader} from './RepoHeader';

export const Repo = () => {
  const currentRepoId = useUiValue('repoId');
  const loadedRepoId = useRepoValue('id');

  return currentRepoId == loadedRepoId ? (
    <>
      <RepoHeader />
      <Issues />
    </>
  ) : null;
};
