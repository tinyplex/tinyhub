/** @jsx createElement */

import {BookMarked, GitFork, Star} from 'lucide-react';
import {Button, Tag} from 'tinywidgets';
import {
  REPOS_FORK_CELL,
  REPOS_NAME_CELL,
  REPOS_STARGAZERS_COUNT_CELL,
  REPOS_STORE,
  REPOS_TABLE,
} from '../../stores/ReposStore';
import {
  SCROLL_OPTIONS,
  createElement,
  formatNumber,
  useEffect,
  useRef,
} from '../common';
import {useCell} from 'tinybase/ui-react';
import {useSetUiValueCallback} from '../../stores/UiStore';

export const RepoLink = ({
  repoId,
  isCurrent,
}: {
  readonly repoId: string;
  readonly isCurrent: boolean;
}) => {
  const handleClick = useSetUiValueCallback('repoId', () => repoId, [repoId]);

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
