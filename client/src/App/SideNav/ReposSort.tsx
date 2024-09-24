/** @jsx createElement */

import {
  useSetSettingsValueCallback,
  useSettingsValue,
} from '../../stores/SettingsStore';
import type {ChangeEvent} from 'react';
import {createElement} from '../../common';

const OPTIONS = {
  name: 'name',
  stargazersCount: 'stars',
  forksCount: 'forks',
  openIssuesCount: 'issues',
  createdAt: 'most recently created',
  updatedAt: 'most recently updated',
  fork: 'repos then forks',
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
