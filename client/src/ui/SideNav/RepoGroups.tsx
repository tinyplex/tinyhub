/** @jsx createElement */

import {
  Provider,
  useCreateIndexes,
  useSliceIds,
  useStore,
  useValue,
} from 'tinybase/ui-react';
import {
  REPOS_FORK_CELL,
  REPOS_GROUP_CELL,
  REPOS_NAME_CELL,
  REPOS_STARGAZERS_COUNT_CELL,
  REPOS_STORE,
  REPOS_TABLE,
} from '../../stores/ReposStore';
import {
  REPOS_SORT_CELL_VALUE,
  REPO_ID_VALUE,
  UI_STORE,
} from '../../stores/UiStore';
import {RepoGroup} from './RepoGroup';
import {createElement} from '../common';
import {createIndexes} from 'tinybase';

export const REPO_GROUP_INDEX = 'repoOrg';

export const RepoGroups = () => {
  const currentRepoId = (useValue(REPO_ID_VALUE, UI_STORE) as string) ?? '';
  const reposSortCell =
    (useValue(REPOS_SORT_CELL_VALUE, UI_STORE) as string) ??
    REPOS_STARGAZERS_COUNT_CELL;
  const reposSortDirection =
    reposSortCell == REPOS_NAME_CELL || reposSortCell == REPOS_FORK_CELL
      ? 1
      : -1;

  const reposStore = useStore(REPOS_STORE);
  const reposIndexes = useCreateIndexes(
    reposStore,
    (reposStore) =>
      createIndexes(reposStore).setIndexDefinition(
        REPO_GROUP_INDEX,
        REPOS_TABLE,
        REPOS_GROUP_CELL,
        reposSortCell,
        undefined,
        (repoCell1, repoCell2) =>
          (repoCell1 > repoCell2 ? 1 : -1) * reposSortDirection,
      ),
    [reposSortCell],
  );

  return (
    <Provider store={reposStore} indexes={reposIndexes}>
      {useSliceIds(REPO_GROUP_INDEX, reposIndexes).map((group) => (
        <RepoGroup group={group} currentRepoId={currentRepoId} key={group} />
      ))}
    </Provider>
  );
};
