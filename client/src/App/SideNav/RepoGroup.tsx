/** @jsx createElement */

import {Collapsible, Tag} from 'tinywidgets';
import {Star, Users} from 'lucide-react';
import {RepoLink} from './RepoLink';
import {createElement} from '../../common';
import {useGroupRepoIds} from '../../stores/ReposStore';

export const RepoGroup = ({
  group,
  currentRepoId,
}: {
  readonly group: string;
  readonly currentRepoId: string;
}) => {
  const repoIds = useGroupRepoIds(group);
  return (
    <Collapsible
      id={`repoGroup/${group}`}
      icon={group == 'Starred' ? Star : Users}
      title={group}
      titleRight={<Tag variant="accent" title={repoIds.length} />}
      key={group}
    >
      {repoIds.map((repoId) => (
        <RepoLink
          repoId={repoId}
          isCurrent={repoId == currentRepoId}
          key={repoId}
        />
      ))}
    </Collapsible>
  );
};
