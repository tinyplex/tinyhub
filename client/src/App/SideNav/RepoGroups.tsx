import {useGroupIds} from '../../stores/ReposStore';
import {useUiValue} from '../../stores/ViewStore';
import {RepoGroup} from './RepoGroup';

export const RepoGroups = () => {
  const currentRepoId = useUiValue('repoId');

  return useGroupIds().map((group) => (
    <RepoGroup group={group} currentRepoId={currentRepoId} key={group} />
  ));
};
