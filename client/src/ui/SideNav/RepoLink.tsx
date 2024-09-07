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
  isCurrent = false,
  hardcodedName,
}: {
  readonly repoId: string;
  readonly isCurrent?: boolean;
  readonly hardcodedName?: string;
}) => {
  const handleClick = useSetUiValueCallback('repoId', () => repoId, [repoId]);

  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (isCurrent) {
      ref.current?.scrollIntoView(SCROLL_OPTIONS);
    }
  }, [isCurrent]);

  const name = useRepoCell(repoId, 'name');
  const starGazersCount = useRepoCell(repoId, 'stargazersCount');

  return (
    <Button
      variant="item"
      ref={ref}
      onClick={handleClick}
      icon={useRepoCell(repoId, 'fork') ? GitFork : BookMarked}
      label={hardcodedName ?? name}
      labelRight={
        hardcodedName ? null : (
          <Tag icon={Star} label={formatNumber(starGazersCount)} />
        )
      }
      current={isCurrent}
    />
  );
};
