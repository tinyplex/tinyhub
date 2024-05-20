import {
  ISSUES_IS_PULL_REQUEST_CELL,
  ISSUES_STORE,
  ISSUES_TABLE,
  ISSUES_TITLE_CELL,
} from '../../../stores/IssuesStore';
import {ISSUE_ID_VALUE, UI_STORE} from '../../../stores/UiStore';
import React, {useEffect, useRef} from 'react';
import {useCell, useSetValueCallback} from 'tinybase/debug/ui-react';
import {SCROLL_OPTIONS} from '../../common/common';

export const IssueLink = ({
  issueId,
  isCurrent,
}: {
  readonly issueId: string;
  readonly isCurrent: boolean;
}) => {
  const classes: string[] = ['icon'];
  if (isCurrent) {
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

  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (isCurrent) {
      ref.current?.scrollIntoView(SCROLL_OPTIONS);
    }
  }, [isCurrent]);

  return (
    <li ref={ref} onClick={handleClick} className={classes.join(' ')}>
      #{issueId}:{' '}
      {useCell(ISSUES_TABLE, issueId, ISSUES_TITLE_CELL, ISSUES_STORE)}
    </li>
  );
};
