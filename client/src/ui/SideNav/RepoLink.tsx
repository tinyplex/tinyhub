import {BookMarked, GitFork, Star} from 'lucide-react';
import {Button, Tag} from 'tinywidgets';
import {
  REPOS_FORK_CELL,
  REPOS_NAME_CELL,
  REPOS_STARGAZERS_COUNT_CELL,
  REPOS_STORE,
  REPOS_TABLE,
} from '../../stores/ReposStore';
import {REPO_ID_VALUE, UI_STORE} from '../../stores/UiStore';
import React, {useEffect, useRef} from 'react';
import {SCROLL_OPTIONS, formatNumber} from '../common/common';
import {useCell, useSetValueCallback} from 'tinybase/ui-react';

export const RepoLink = ({
  repoId,
  isCurrent,
}: {
  readonly repoId: string;
  readonly isCurrent: boolean;
}) => {
  const handleClick = useSetValueCallback(
    REPO_ID_VALUE,
    () => repoId,
    [repoId],
    UI_STORE,
  );

  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (isCurrent) {
      ref.current?.scrollIntoView(SCROLL_OPTIONS);
    }
  }, [isCurrent]);

  return (
    <Button
      variant="item"
      ref={ref}
      onClick={handleClick}
      icon={
        useCell(REPOS_TABLE, repoId, REPOS_FORK_CELL, REPOS_STORE)
          ? GitFork
          : BookMarked
      }
      label={useCell(REPOS_TABLE, repoId, REPOS_NAME_CELL, REPOS_STORE)}
      labelRight={
        <Tag
          icon={Star}
          label={formatNumber(
            useCell(
              REPOS_TABLE,
              repoId,
              REPOS_STARGAZERS_COUNT_CELL,
              REPOS_STORE,
            ),
          )}
        />
      }
      current={isCurrent}
    />
  );
};
