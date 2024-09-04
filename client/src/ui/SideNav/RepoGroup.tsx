/** @jsx createElement */

import {Collapsible, Tag} from 'tinywidgets';
import {Star, Users} from 'lucide-react';
import {REPO_GROUP_INDEX} from './RepoGroups';
import {RepoLink} from './RepoLink';
import {createElement} from '../common';
import {useSliceRowIds} from 'tinybase/ui-react';

export const RepoGroup = ({
  group,
  currentRepoId,
}: {
  readonly group: string;
  readonly currentRepoId: string;
}) => {
  const repoIds = useSliceRowIds(REPO_GROUP_INDEX, group);
  return (
    <Collapsible
      id={`repoGroup/${group}`}
      icon={group == 'Starred' ? Star : Users}
      label={group}
      labelRight={<Tag variant="accent" label={repoIds.length} />}
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
