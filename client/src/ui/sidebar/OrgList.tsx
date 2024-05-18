import {
  Provider,
  useCreateIndexes,
  useSliceIds,
  useStore,
  useValue,
} from 'tinybase/debug/ui-react';
import {
  REPOS_FORK_CELL,
  REPOS_OWNER_CELL,
  REPOS_STORE,
  REPOS_TABLE,
} from '../../stores/ReposStore';
import {REPO_ID_VALUE, UI_STORE} from '../../stores/UiStore';
import React from 'react';
import {RepoList} from './RepoList';
import {createIndexes} from 'tinybase/debug';

export const REPO_ORG_INDEX = 'repoOrg';

export const OrgList = () => {
  const currentRepoId = (useValue(REPO_ID_VALUE, UI_STORE) as string) ?? '';

  const reposStore = useStore(REPOS_STORE);
  const reposIndexes = useCreateIndexes(reposStore, (reposStore) =>
    createIndexes(reposStore).setIndexDefinition(
      REPO_ORG_INDEX,
      REPOS_TABLE,
      REPOS_OWNER_CELL,
      REPOS_FORK_CELL,
    ),
  );

  return (
    <Provider store={reposStore} indexes={reposIndexes}>
      <ul id="orgList">
        {useSliceIds(REPO_ORG_INDEX, reposIndexes).map((owner) => (
          <li key={owner}>
            <details>
              <summary>{owner}</summary>
              <RepoList owner={owner} currentRepoId={currentRepoId} />
            </details>
          </li>
        ))}
      </ul>
    </Provider>
  );
};
