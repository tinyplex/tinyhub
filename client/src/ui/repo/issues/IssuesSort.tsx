import {
  ISSUES_CREATED_AT_CELL,
  ISSUES_IS_PULL_REQUEST_CELL,
  ISSUES_TITLE_CELL,
  ISSUES_UPDATED_AT_CELL,
} from '../../../stores/IssuesStore';
import {ISSUES_SORT_CELL_VALUE, UI_STORE} from '../../../stores/UiStore';
import React, {type ChangeEvent} from 'react';
import {useSetValueCallback, useValue} from 'tinybase/debug/ui-react';

const OPTIONS = {
  [ISSUES_TITLE_CELL]: 'title',
  [ISSUES_CREATED_AT_CELL]: 'most recently created',
  [ISSUES_UPDATED_AT_CELL]: 'most recently updated',
  [ISSUES_IS_PULL_REQUEST_CELL]: 'pull requests then issues',
};

export const IssuesSort = () => {
  const issuesSortCell =
    (useValue(ISSUES_SORT_CELL_VALUE, UI_STORE) as string) ??
    ISSUES_UPDATED_AT_CELL;

  const handleChange = useSetValueCallback(
    ISSUES_SORT_CELL_VALUE,
    (event: ChangeEvent<HTMLSelectElement>) => event.target.value,
    [],
    UI_STORE,
  );

  return (
    <div className="sort">
      <label>Issues sorted by</label>
      <select onChange={handleChange} value={issuesSortCell}>
        {Object.entries(OPTIONS).map(([key, label]) => (
          <option value={key} key={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
