import {REPOS_STORE, REPOS_TABLE} from '../../stores/ReposStore';
import {REPO_ID, UI_STORE} from '../../stores/UiStore';
import {useRowIds, useValue} from 'tinybase/debug/ui-react';
import React from 'react';
import {RepoAdd} from './RepoAdd';
import {RepoLink} from './RepoLink';

export const Sidebar = () => {
  const currentRepoId = (useValue(REPO_ID, UI_STORE) as string) ?? '';
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
