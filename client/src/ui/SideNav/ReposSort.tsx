/** @jsx createElement */

import {
  REPOS_CREATED_AT_CELL,
  REPOS_FORKS_COUNT_CELL,
  REPOS_FORK_CELL,
  REPOS_NAME_CELL,
  REPOS_OPEN_ISSUES_COUNT_CELL,
  REPOS_STARGAZERS_COUNT_CELL,
  REPOS_UPDATED_AT_CELL,
} from '../../stores/ReposStore';
import {
  useSetSettingsValueCallback,
  useSettingsValue,
} from '../../stores/SettingsStore';
import type {ChangeEvent} from 'react';
import {createElement} from '../common';

const OPTIONS = {
  [REPOS_NAME_CELL]: 'name',
  [REPOS_STARGAZERS_COUNT_CELL]: 'stars',
  [REPOS_FORKS_COUNT_CELL]: 'forks',
  [REPOS_OPEN_ISSUES_COUNT_CELL]: 'issues',
  [REPOS_CREATED_AT_CELL]: 'most recently created',
  [REPOS_UPDATED_AT_CELL]: 'most recently updated',
  [REPOS_FORK_CELL]: 'repos then forks',
};

export const ReposSort = () => {
  const reposSortCell = useSettingsValue('reposSortCell');
  const change = useSetSettingsValueCallback(
    'reposSortCell',
    (event: ChangeEvent<HTMLSelectElement>) => event.target.value,
    [],
  );

  return (
    <div>
      <label>Repos sorted by</label>
      <select onChange={change} value={reposSortCell}>
        {Object.entries(OPTIONS).map(([key, label]) => (
          <option value={key} key={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
