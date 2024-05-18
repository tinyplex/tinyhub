import {
  REPOS_OWNER_CELL,
  REPOS_REPO_CELL,
  REPOS_STORE,
  REPOS_TABLE,
} from '../../stores/ReposStore';
import {REPO_ID_VALUE, UI_STORE} from '../../stores/UiStore';
import {useCell, useSetValueCallback} from 'tinybase/debug/ui-react';
import React from 'react';

export const RepoLink = ({
  repoId,
  currentRepoId,
}: {
  readonly repoId: string;
  readonly currentRepoId: string;
}) => {
  const classes: string[] = [];
  if (repoId == currentRepoId) {
    classes.push('current');
  }

  const handleClick = useSetValueCallback(
    REPO_ID_VALUE,
    () => repoId,
    [repoId],
    UI_STORE,
  );

  return (
    <li
      onClick={handleClick}
      title={
        useCell(REPOS_TABLE, repoId, REPOS_OWNER_CELL, REPOS_STORE) +
        '/' +
        useCell(REPOS_TABLE, repoId, REPOS_REPO_CELL, REPOS_STORE)
      }
      className={classes.join(' ')}
    >
      {useCell(REPOS_TABLE, repoId, REPOS_REPO_CELL, REPOS_STORE)}
    </li>
  );
};
