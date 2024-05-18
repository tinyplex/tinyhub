import {
  Provider,
  useCreateIndexes,
  useSliceIds,
  useStore,
  useValue,
} from 'tinybase/debug/ui-react';
import {
  REPOS_FORK_CELL,
  REPOS_GROUP_CELL,
  REPOS_STORE,
  REPOS_TABLE,
} from '../../stores/ReposStore';
import {REPO_ID_VALUE, UI_STORE} from '../../stores/UiStore';
import React from 'react';
import {RepoGroup} from './RepoGroup';
import {createIndexes} from 'tinybase/debug';

export const REPO_GROUP_INDEX = 'repoOrg';

export const OrgList = () => {
  const currentRepoId = (useValue(REPO_ID_VALUE, UI_STORE) as string) ?? '';

  const reposStore = useStore(REPOS_STORE);
  const reposIndexes = useCreateIndexes(reposStore, (reposStore) =>
    createIndexes(reposStore).setIndexDefinition(
      REPO_GROUP_INDEX,
      REPOS_TABLE,
      REPOS_GROUP_CELL,
      REPOS_FORK_CELL,
    ),
  );

  return (
    <Provider store={reposStore} indexes={reposIndexes}>
      <ul id="repoGroups">
        {useSliceIds(REPO_GROUP_INDEX, reposIndexes).map((group) => (
          <RepoGroup group={group} currentRepoId={currentRepoId} key={group} />
        ))}
      </ul>
    </Provider>
  );
};
