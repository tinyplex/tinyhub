import {
  REPOS_FORK_CELL,
  REPOS_NAME_CELL,
  REPOS_OWNER_CELL,
  REPOS_STARGAZERS_COUNT_CELL,
  REPOS_STORE,
  REPOS_TABLE,
} from '../../stores/ReposStore';
import {REPO_ID_VALUE, UI_STORE} from '../../stores/UiStore';
import React, {useEffect, useRef} from 'react';
import {SCROLL_OPTIONS, formatNumber} from '../common/common';
import {useCell, useSetValueCallback} from 'tinybase/debug/ui-react';

export const RepoLink = ({
  repoId,
  isCurrent,
}: {
  readonly repoId: string;
  readonly isCurrent: boolean;
}) => {
  const classes: string[] = ['icon'];
  if (isCurrent) {
    classes.push('current');
  }
  classes.push(
    useCell(REPOS_TABLE, repoId, REPOS_FORK_CELL, REPOS_STORE)
      ? 'fork'
      : 'repo',
  );

  const handleClick = useSetValueCallback(
    REPO_ID_VALUE,
    () => repoId,
    [repoId],
    UI_STORE,
  );

  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (isCurrent) {
      ref.current?.scrollIntoView(SCROLL_OPTIONS);
    }
  }, [isCurrent]);

  return (
    <li
      ref={ref}
      onClick={handleClick}
      title={
        useCell(REPOS_TABLE, repoId, REPOS_OWNER_CELL, REPOS_STORE) +
        '/' +
        useCell(REPOS_TABLE, repoId, REPOS_NAME_CELL, REPOS_STORE)
      }
      className={classes.join(' ')}
    >
      {useCell(REPOS_TABLE, repoId, REPOS_NAME_CELL, REPOS_STORE)}
      <span className="meta star">
        {formatNumber(
          useCell(
            REPOS_TABLE,
            repoId,
            REPOS_STARGAZERS_COUNT_CELL,
            REPOS_STORE,
          ),
        )}
      </span>
    </li>
  );
};
