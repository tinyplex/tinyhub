import {Issues} from './Issues';
import React from 'react';
import {RepoHeader} from './RepoHeader';
import {useRepoValue} from '../../stores/RepoStore';
import {useUiValue} from '../../stores/ViewStore';

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
