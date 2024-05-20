import {
  REPOS_ARCHIVED_CELL,
  REPOS_CREATED_AT_CELL,
  REPOS_DESCRIPTION_CELL,
  REPOS_DISABLED_CELL,
  REPOS_FORK_CELL,
  REPOS_HOMEPAGE_CELL,
  REPOS_NAME_CELL,
  REPOS_UPDATED_AT_CELL,
  REPOS_VISIBILITY_CELL,
  useRepoCell,
} from '../../stores/ReposStore';
import {REPO_ID_VALUE, UI_STORE} from '../../stores/UiStore';
import React from 'react';
import {formatDate} from '../common/common';
import {useValue} from 'tinybase/debug/ui-react';

export const RepoHeader = () => {
  const repoId = (useValue(REPO_ID_VALUE, UI_STORE) as string) ?? '';
  const homepage = useRepoCell(repoId, REPOS_HOMEPAGE_CELL) as string;
  return (
    <header id="repoHeader">
      <h1>
        {useRepoCell(repoId, REPOS_NAME_CELL)}
        <span className="meta visibility">
          {useRepoCell(repoId, REPOS_VISIBILITY_CELL)}
        </span>
        {useRepoCell(repoId, REPOS_FORK_CELL) ? (
          <span className="meta fork">fork</span>
        ) : null}
        {useRepoCell(repoId, REPOS_ARCHIVED_CELL) ? (
          <span className="meta archived">archived</span>
        ) : null}
        {useRepoCell(repoId, REPOS_DISABLED_CELL) ? (
          <span className="meta disabled">disabled</span>
        ) : null}
      </h1>
      <p>{useRepoCell(repoId, REPOS_DESCRIPTION_CELL)}</p>
      <p>
        Created {formatDate(useRepoCell(repoId, REPOS_CREATED_AT_CELL))},
        updated {formatDate(useRepoCell(repoId, REPOS_UPDATED_AT_CELL))}.
        {homepage ? (
          <>
            <br />
            <a href={homepage} target="_blank" rel="noreferrer">
              {homepage}
            </a>
          </>
        ) : null}
      </p>
    </header>
  );
};
