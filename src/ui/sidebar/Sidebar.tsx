import {REPOS_STORE, REPOS_TABLE} from '../../stores/ReposStore';
import React from 'react';
import {RepoAdd} from './RepoAdd';
import {RepoLink} from './RepoLink';
import {useRowIds} from 'tinybase/debug/ui-react';
import {useUiRepoId} from '../../stores/UiStore';

export const Sidebar = () => {
  const currentRepoId = useUiRepoId();
  return (
    <nav id="sidebar">
      <ul id="repoList">
        {useRowIds(REPOS_TABLE, REPOS_STORE).map((repoId) => (
          <RepoLink
            repoId={repoId}
            currentRepoId={currentRepoId}
            key={repoId}
          />
        ))}
      </ul>
      <hr />
      <RepoAdd />
    </nav>
  );
};
