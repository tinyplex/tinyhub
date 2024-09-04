/** @jsx createElement */

import {
  ISSUES_CREATED_AT_CELL,
  ISSUES_IS_PULL_REQUEST_CELL,
  ISSUES_TITLE_CELL,
  ISSUES_UPDATED_AT_CELL,
} from '../../../stores/IssuesStore';
import {
  useSetSettingsValueCallback,
  useSettingsValue,
} from '../../../stores/SettingsStore';
import type {ChangeEvent} from 'react';
import {createElement} from '../../common';

const OPTIONS = {
  [ISSUES_TITLE_CELL]: 'title',
  [ISSUES_CREATED_AT_CELL]: 'most recently created',
  [ISSUES_UPDATED_AT_CELL]: 'most recently updated',
  [ISSUES_IS_PULL_REQUEST_CELL]: 'pull requests then issues',
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
