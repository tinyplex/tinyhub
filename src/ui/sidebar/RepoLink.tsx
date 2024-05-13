import {REPO_ID, UI_STORE} from '../../stores/UiStore';
import React from 'react';
import {useSetValueCallback} from 'tinybase/debug/ui-react';

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
    REPO_ID,
    () => repoId,
    [repoId],
    UI_STORE,
  );

  return (
    <li onClick={handleClick} className={classes.join(' ')}>
      {repoId}
    </li>
  );
};
