import React from 'react';
import {useUiSetRepoId} from '../../stores/UiStore';

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

  const handleClick = useUiSetRepoId(repoId);

  return (
    <li onClick={handleClick} className={classes.join(' ')}>
      {repoId}
    </li>
  );
};
