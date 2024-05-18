import {REPO_ORG_INDEX} from './OrgList';
import React from 'react';
import {RepoLink} from './RepoLink';
import {useSliceRowIds} from 'tinybase/debug/ui-react';

export const RepoList = ({
  owner,
  currentRepoId,
}: {
  readonly owner: string;
  readonly currentRepoId: string;
}) => {
  const repoIds = useSliceRowIds(REPO_ORG_INDEX, owner);
  return (
    <ul className="repoList">
      {repoIds.map((repoId) => (
        <RepoLink repoId={repoId} currentRepoId={currentRepoId} key={repoId} />
      ))}
    </ul>
  );
};
