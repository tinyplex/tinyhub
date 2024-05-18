import {REPO_GROUP_INDEX} from './RepoGroups';
import React from 'react';
import {Repo} from './Repo';
import {useSliceRowIds} from 'tinybase/debug/ui-react';

export const RepoGroup = ({
  group,
  currentRepoId,
}: {
  readonly group: string;
  readonly currentRepoId: string;
}) => {
  const repoIds = useSliceRowIds(REPO_GROUP_INDEX, group);
  return (
    <li>
      <details>
        <summary>{group}</summary>
        <ul>
          {repoIds.map((repoId) => (
            <Repo repoId={repoId} currentRepoId={currentRepoId} key={repoId} />
          ))}
        </ul>
      </details>
    </li>
  );
};
