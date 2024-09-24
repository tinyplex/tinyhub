import {Collapsible, Tag} from '../../../../../tinywidgets/package/src';
import {Star, Users} from 'lucide-react';
import React from 'react';
import {RepoLink} from './RepoLink';
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
