import {
  REPOS_ARCHIVED_CELL,
  REPOS_CREATED_AT_CELL,
  REPOS_DESCRIPTION_CELL,
  REPOS_DISABLED_CELL,
  REPOS_FORKS_COUNT_CELL,
  REPOS_FORK_CELL,
  REPOS_HOMEPAGE_CELL,
  REPOS_LANGUAGE_CELL,
  REPOS_LICENSE_CELL,
  REPOS_NAME_CELL,
  REPOS_OPEN_ISSUES_COUNT_CELL,
  REPOS_OWNER_CELL,
  REPOS_STARGAZERS_COUNT_CELL,
  REPOS_STORE,
  REPOS_TABLE,
  REPOS_UPDATED_AT_CELL,
  REPOS_VISIBILITY_CELL,
} from '../../stores/ReposStore';
import {REPO_ID_VALUE, UI_STORE} from '../../stores/UiStore';
import {formatDate, formatNumber} from '../common/common';
import {useCell, useValue} from 'tinybase/debug/ui-react';
import React from 'react';

const useRepoCell = (repoId: string, cellId: string) =>
  useCell(REPOS_TABLE, repoId, cellId, REPOS_STORE);

export const RepoHeader = () => {
  const repoId = (useValue(REPO_ID_VALUE, UI_STORE) as string)!;
  const homepage = useRepoCell(repoId, REPOS_HOMEPAGE_CELL) as string;
  return (
    <>
      <header>
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
      <aside>
        <table>
          <tr>
            <th>Stars:</th>
            <td>
              {formatNumber(useRepoCell(repoId, REPOS_STARGAZERS_COUNT_CELL))}
            </td>
          </tr>
          <tr>
            <th>Forks:</th>
            <td>{formatNumber(useRepoCell(repoId, REPOS_FORKS_COUNT_CELL))}</td>
          </tr>
          <tr>
            <th>Issues:</th>
            <td>
              {formatNumber(useRepoCell(repoId, REPOS_OPEN_ISSUES_COUNT_CELL))}
            </td>
          </tr>
          <tr>
            <th>Owner:</th>
            <td>{useRepoCell(repoId, REPOS_OWNER_CELL)}</td>
          </tr>
          <tr>
            <th>Language:</th>
            <td>{useRepoCell(repoId, REPOS_LANGUAGE_CELL)}</td>
          </tr>
          <tr>
            <th>License:</th>
            <td>{useRepoCell(repoId, REPOS_LICENSE_CELL)}</td>
          </tr>
        </table>
      </aside>
    </>
  );
};
