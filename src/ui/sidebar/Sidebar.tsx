import React from 'react';
import {RepoAdd} from './RepoAdd';
import {RepoLink} from './RepoLink';
import {useUiRepoId} from '../../stores/UiStore';

export const Sidebar = () => {
  const currentRepoId = useUiRepoId();
  return (
    <nav id="sidebar">
      <ul id="repoList">
        <RepoLink repoId="Repo 1" currentRepoId={currentRepoId} />
        <RepoLink repoId="Repo 2" currentRepoId={currentRepoId} />
      </ul>
      <hr />
      <RepoAdd />
    </nav>
  );
};
