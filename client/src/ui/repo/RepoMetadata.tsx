import {
  REPOS_FORKS_COUNT_CELL,
  REPOS_LANGUAGE_CELL,
  REPOS_LICENSE_CELL,
  REPOS_OPEN_ISSUES_COUNT_CELL,
  REPOS_OWNER_CELL,
  REPOS_STARGAZERS_COUNT_CELL,
  useRepoCell,
} from '../../stores/ReposStore';
import {REPO_ID_VALUE, UI_STORE} from '../../stores/UiStore';
import React from 'react';
import {formatNumber} from '../common/common';
import {useValue} from 'tinybase/ui-react';

export const RepoMetadata = () => {
  const repoId = (useValue(REPO_ID_VALUE, UI_STORE) as string) ?? '';
  return (
    <aside id="repoMetadata">
      <table>
        <tbody>
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
        </tbody>
      </table>
    </aside>
  );
};
