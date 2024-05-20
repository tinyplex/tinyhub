import {
  REPOS_CREATED_AT_CELL,
  REPOS_FORKS_COUNT_CELL,
  REPOS_FORK_CELL,
  REPOS_NAME_CELL,
  REPOS_OPEN_ISSUES_COUNT_CELL,
  REPOS_STARGAZERS_COUNT_CELL,
  REPOS_UPDATED_AT_CELL,
} from '../../stores/ReposStore';
import {REPO_SORT_CELL_VALUE, UI_STORE} from '../../stores/UiStore';
import React, {type ChangeEvent} from 'react';
import {useSetValueCallback, useValue} from 'tinybase/debug/ui-react';

const OPTIONS = {
  [REPOS_NAME_CELL]: 'name',
  [REPOS_STARGAZERS_COUNT_CELL]: 'stars',
  [REPOS_FORKS_COUNT_CELL]: 'forks',
  [REPOS_OPEN_ISSUES_COUNT_CELL]: 'issues',
  [REPOS_CREATED_AT_CELL]: 'most recently created',
  [REPOS_UPDATED_AT_CELL]: 'most recently updated',
  [REPOS_FORK_CELL]: 'repo vs fork',
};

export const RepoSort = () => {
  const repoSortCell =
    (useValue(REPO_SORT_CELL_VALUE, UI_STORE) as string) ?? REPOS_FORK_CELL;

  const handleChange = useSetValueCallback(
    REPO_SORT_CELL_VALUE,
    (event: ChangeEvent<HTMLSelectElement>) => event.target.value,
    [],
    UI_STORE,
  );

  return (
    <div id="repoSort">
      <label>Repos sorted by</label>
      <select onChange={handleChange} value={repoSortCell}>
        {Object.entries(OPTIONS).map(([key, label]) => (
          <option value={key} key={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
