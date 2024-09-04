/** @jsx createElement */

import {
  ISSUES_STORE,
  ISSUES_TABLE,
  ISSUES_TITLE_CELL,
  ISSUES_UPDATED_AT_CELL,
} from '../../../../stores/IssuesStore';
import {useSortedRowIds, useValue} from 'tinybase/ui-react';
import {ISSUES_SORT_CELL_VALUE} from '../../../../stores/SettingsStore';
import {IssueLink} from './IssueLink';
import {UI_STORE} from '../../../../stores/UiStore';
import {createElement} from '../../../common';

export const IssueList = ({
  currentIssueId,
}: {
  readonly currentIssueId: string;
}) => {
  const issuesSortCell =
    (useValue(ISSUES_SORT_CELL_VALUE, UI_STORE) as string) ??
    ISSUES_UPDATED_AT_CELL;
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
