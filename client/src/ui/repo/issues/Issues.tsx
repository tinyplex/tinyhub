import {
  ISSUES_SORT_CELL_VALUE,
  ISSUE_ID_VALUE,
  UI_STORE,
} from '../../../stores/UiStore';
import {
  ISSUES_STORE,
  ISSUES_TABLE,
  ISSUES_TITLE_CELL,
  ISSUES_UPDATED_AT_CELL,
} from '../../../stores/IssuesStore';
import {useSortedRowIds, useValue} from 'tinybase/debug/ui-react';
import {IssueLink} from './IssueLink';
import {IssuesSort} from './IssuesSort';
import React from 'react';

export const Issues = () => {
  const currentIssueId = (useValue(ISSUE_ID_VALUE, UI_STORE) as string) ?? '';
  const issuesSortCell =
    (useValue(ISSUES_SORT_CELL_VALUE, UI_STORE) as string) ??
    ISSUES_UPDATED_AT_CELL;
  const issuesSortAscending = issuesSortCell == ISSUES_TITLE_CELL;

  return (
    <nav id="issues">
      <IssuesSort />
      <hr />
      <ul className="navList">
        {useSortedRowIds(
          ISSUES_TABLE,
          issuesSortCell,
          !issuesSortAscending,
          undefined,
          undefined,
          ISSUES_STORE,
        ).map((issueId) => (
          <IssueLink
            key={issueId}
            issueId={issueId}
            currentIssueId={currentIssueId}
          />
        ))}
      </ul>
    </nav>
  );
};
