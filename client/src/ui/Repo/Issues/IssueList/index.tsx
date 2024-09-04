/** @jsx createElement */

import {
  ISSUES_STORE,
  ISSUES_TABLE,
  ISSUES_TITLE_CELL,
} from '../../../../stores/IssuesStore';
import {IssueLink} from './IssueLink';
import {createElement} from '../../../common';
import {useSettingsValue} from '../../../../stores/SettingsStore';
import {useSortedRowIds} from 'tinybase/ui-react';

export const IssueList = ({
  currentIssueId,
}: {
  readonly currentIssueId: string;
}) => {
  const issuesSortCell = useSettingsValue('issuesSortCell');
  const issuesSortAscending = issuesSortCell == ISSUES_TITLE_CELL;

  const issueIds = useSortedRowIds(
    ISSUES_TABLE,
    issuesSortCell,
    !issuesSortAscending,
    undefined,
    undefined,
    ISSUES_STORE,
  );

  return issueIds.map((issueId) => (
    <IssueLink
      key={issueId}
      issueId={issueId}
      isCurrent={issueId == currentIssueId}
    />
  ));
};
