/** @jsx createElement */

import {
  useSetSettingsValueCallback,
  useSettingsValue,
} from '../../../stores/SettingsStore';
import type {ChangeEvent} from 'react';
import {createElement} from '../../../common';

const OPTIONS = {
  title: 'title',
  createdAt: 'most recently created',
  updatedAt: 'most recently updated',
  pullRequest: 'pull requests then issues',
};

export const IssuesSort = () => {
  const issuesSortCell = useSettingsValue('issuesSortCell');
  const change = useSetSettingsValueCallback(
    'issuesSortCell',
    (event: ChangeEvent<HTMLSelectElement>) => event.target.value,
    [],
  );

  return (
    <div>
      <label>Issues sorted by</label>
      <select onChange={change} value={issuesSortCell}>
        {Object.entries(OPTIONS).map(([key, label]) => (
          <option value={key} key={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
