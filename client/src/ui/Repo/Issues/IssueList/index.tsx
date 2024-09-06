/** @jsx createElement */

import {IssueLink} from './IssueLink';
import {createElement} from '../../../../common';
import {useIssuesSortedRowIds} from '../../../../stores/IssuesStore';
import {useSettingsValue} from '../../../../stores/SettingsStore';

export const IssueList = ({
  currentIssueId,
}: {
  readonly currentIssueId: string;
}) => {
  const issuesSortCell = useSettingsValue('issuesSortCell');
  const issuesSortAscending = issuesSortCell == 'title';
  const issueIds = useIssuesSortedRowIds(
    issuesSortCell as any,
    !issuesSortAscending,
  );

  return issueIds.map((issueId) => (
    <IssueLink
      key={issueId}
      issueId={issueId}
      isCurrent={issueId == currentIssueId}
    />
  ));
};
