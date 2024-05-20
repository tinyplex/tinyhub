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
  REPOS_NAME_CELL,
  REPOS_STORE,
  REPOS_TABLE,
} from '../../stores/ReposStore';
import {
  REPO_ID_VALUE,
  REPO_SORT_CELL_VALUE,
  UI_STORE,
} from '../../stores/UiStore';
import React from 'react';
import {RepoGroup} from './RepoGroup';
import {RepoSort} from './RepoSort';
import {createIndexes} from 'tinybase/debug';

export const REPO_GROUP_INDEX = 'repoOrg';

export const OrgList = () => {
  const currentRepoId = (useValue(REPO_ID_VALUE, UI_STORE) as string) ?? '';
  const repoSortCell =
    (useValue(REPO_SORT_CELL_VALUE, UI_STORE) as string) ?? REPOS_FORK_CELL;
  const repoSortDirection =
    repoSortCell == REPOS_NAME_CELL || repoSortCell == REPOS_FORK_CELL ? 1 : -1;

  const reposStore = useStore(REPOS_STORE);
  const reposIndexes = useCreateIndexes(
    reposStore,
    (reposStore) =>
      createIndexes(reposStore).setIndexDefinition(
        REPO_GROUP_INDEX,
        REPOS_TABLE,
        REPOS_GROUP_CELL,
        repoSortCell,
        undefined,
        (repoCell1, repoCell2) =>
          (repoCell1 > repoCell2 ? 1 : -1) * repoSortDirection,
      ),
    [repoSortCell],
  );

  return (
    <Provider store={reposStore} indexes={reposIndexes}>
      <RepoSort />
      <hr />
      <ul id="repoGroups">
        {useSliceIds(REPO_GROUP_INDEX, reposIndexes).map((group) => (
          <RepoGroup group={group} currentRepoId={currentRepoId} key={group} />
        ))}
      </ul>
    </Provider>
  );
};
