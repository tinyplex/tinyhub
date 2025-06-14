import {Select} from 'tinywidgets';
import {
  useSetSettingsValueCallback,
  useSettingsValue,
} from '../../stores/SettingsStore';

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
  const handleChange = useSetSettingsValueCallback(
    'reposSortCell',
    (option) => option as string,
  );

  return (
    <div>
      <label>Repos sorted by</label>
      <Select
        onChange={handleChange}
        initialOption={reposSortCell}
        options={OPTIONS}
      />
    </div>
  );
};
