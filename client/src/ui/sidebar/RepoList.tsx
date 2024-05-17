import {REPO_ORG_RELATIONSHIP} from './OrgList';
import React from 'react';
import {RepoLink} from './RepoLink';
import {useLocalRowIds} from 'tinybase/debug/ui-react';

export const RepoList = ({
  orgId,
  currentRepoId,
}: {
  readonly orgId: string;
  readonly currentRepoId: string;
}) => {
  const repoIds = useLocalRowIds(REPO_ORG_RELATIONSHIP, orgId);
  return (
    <ul className="repoList">
      {repoIds.length > 0 ? (
        repoIds.map((repoId) => (
          <RepoLink
            repoId={repoId}
            currentRepoId={currentRepoId}
            key={repoId}
          />
        ))
      ) : (
        <li>No repos</li>
      )}
    </ul>
  );
};
