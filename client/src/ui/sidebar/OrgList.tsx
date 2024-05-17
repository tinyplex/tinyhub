import {
  ORGS_TABLE,
  REPOS_OWNER_CELL,
  REPOS_STORE,
  REPOS_TABLE,
} from '../../stores/ReposStore';
import {
  Provider,
  useCreateRelationships,
  useRowIds,
  useStore,
  useValue,
} from 'tinybase/debug/ui-react';
import {REPO_ID, UI_STORE} from '../../stores/UiStore';
import React from 'react';
import {RepoList} from './RepoList';
import {createRelationships} from 'tinybase/debug';

export const REPO_ORG_RELATIONSHIP = 'repoOrg';

export const OrgList = () => {
  const currentRepoId = (useValue(REPO_ID, UI_STORE) as string) ?? '';

  const reposStore = useStore(REPOS_STORE);
  const reposRelationships = useCreateRelationships(reposStore, (reposStore) =>
    createRelationships(reposStore).setRelationshipDefinition(
      REPO_ORG_RELATIONSHIP,
      REPOS_TABLE,
      ORGS_TABLE,
      REPOS_OWNER_CELL,
    ),
  );

  return (
    <Provider store={reposStore} relationships={reposRelationships}>
      <ul id="orgList">
        {useRowIds(ORGS_TABLE, REPOS_STORE).map((orgId) => (
          <li key={orgId}>
            <details>
              <summary>{orgId}</summary>
              <RepoList orgId={orgId} currentRepoId={currentRepoId} />
            </details>
          </li>
        ))}
      </ul>
    </Provider>
  );
};
