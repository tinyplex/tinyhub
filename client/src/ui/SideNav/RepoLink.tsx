/** @jsx createElement */

import {BookMarked, GitFork, Star} from 'lucide-react';
import {Button, Tag} from 'tinywidgets';
import {
  SCROLL_OPTIONS,
  createElement,
  formatNumber,
  useEffect,
  useRef,
} from '../../common';
import {useRepoCell} from '../../stores/ReposStore';
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
      icon={useRepoCell(repoId, 'fork') ? GitFork : BookMarked}
      label={useRepoCell(repoId, 'name')}
      labelRight={
        <Tag
          icon={Star}
          label={formatNumber(useRepoCell(repoId, 'stargazersCount'))}
        />
      }
      current={isCurrent}
    />
  );
};
