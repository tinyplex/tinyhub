import {Select} from 'tinywidgets';
import {
  useSetSettingsValueCallback,
  useSettingsValue,
} from '../../stores/SettingsStore';

const OPTIONS = {
  title: 'title',
  createdAt: 'most recently created',
  updatedAt: 'most recently updated',
  pullRequest: 'pull requests then issues',
};

export const IssuesSort = () => {
  const issuesSortCell = useSettingsValue('issuesSortCell');
  const handleChange = useSetSettingsValueCallback(
    'issuesSortCell',
    (option) => option as string,
  );

  return (
    <div>
      <label>Issues sorted by</label>
      <Select
        onChange={handleChange}
        initialOption={issuesSortCell}
        options={OPTIONS}
      />
    </div>
  );
};
