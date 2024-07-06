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
import React, {useEffect, useRef} from 'react';
import {
  useSetValueCallback,
  useSortedRowIds,
  useValue,
} from 'tinybase/ui-react';
import {IssueLink} from './IssueLink';
import {IssuesSort} from './IssuesSort';

export const Issues = () => {
  const currentIssueId = (useValue(ISSUE_ID_VALUE, UI_STORE) as string) ?? '';
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

  const currentIndex = issueIds.indexOf(currentIssueId);
  const prevIssue =
    issueIds[currentIndex > 0 ? currentIndex - 1 : currentIndex];
  const nextIssue =
    issueIds[
      currentIndex != -1 && currentIndex != issueIds.length - 1
        ? currentIndex + 1
        : currentIndex
    ];

  const handleKey = useSetValueCallback(
    ISSUE_ID_VALUE,
    (event: KeyboardEvent) =>
      ref.current == document.activeElement
        ? event.code == 'ArrowUp'
          ? prevIssue
          : event.code == 'ArrowDown'
            ? nextIssue
            : currentIssueId
        : currentIssueId,
    [prevIssue, nextIssue, currentIssueId, focus],
    UI_STORE,
  );
  useEffect(() => {
    addEventListener('keydown', handleKey);
    return () => removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const ref = useRef<HTMLElement>(null);

  return (
    <nav ref={ref} id="issues" tabIndex={0}>
      <IssuesSort />
      <hr />
      <ul className="navList">
        {issueIds.map((issueId) => (
          <IssueLink
            key={issueId}
            issueId={issueId}
            isCurrent={issueId == currentIssueId}
          />
        ))}
      </ul>
    </nav>
  );
};
