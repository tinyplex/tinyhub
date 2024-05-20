import {
  ISSUES_IS_PULL_REQUEST_CELL,
  ISSUES_STORE,
  ISSUES_TABLE,
  ISSUES_TITLE_CELL,
} from '../../stores/IssuesStore';
import {ISSUE_ID_VALUE, UI_STORE} from '../../stores/UiStore';
import {useCell, useSetValueCallback} from 'tinybase/debug/ui-react';
import React from 'react';

export const IssueLink = ({
  issueId,
  currentIssueId,
}: {
  readonly issueId: string;
  readonly currentIssueId: string;
}) => {
  const classes: string[] = ['icon'];
  if (issueId == currentIssueId) {
    classes.push('current');
  }
  classes.push(
    useCell(ISSUES_TABLE, issueId, ISSUES_IS_PULL_REQUEST_CELL, ISSUES_STORE)
      ? 'pr'
      : 'issue',
  );

  const handleClick = useSetValueCallback(
    ISSUE_ID_VALUE,
    () => issueId,
    [issueId],
    UI_STORE,
  );

  return (
    <li onClick={handleClick} className={classes.join(' ')}>
      #{issueId}:{' '}
      {useCell(ISSUES_TABLE, issueId, ISSUES_TITLE_CELL, ISSUES_STORE)}
    </li>
  );
};
