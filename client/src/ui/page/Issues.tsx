import {ISSUES_STORE, ISSUES_TABLE} from '../../stores/IssuesStore';
import {ISSUE_ID_VALUE, UI_STORE} from '../../stores/UiStore';
import {useRowIds, useValue} from 'tinybase/debug/ui-react';
import {IssueLink} from './IssueLink';
import React from 'react';

export const Issues = () => {
  const currentIssueId = (useValue(ISSUE_ID_VALUE, UI_STORE) as string) ?? '';
  return (
    <nav id="issues">
      <ul className="navList">
        {useRowIds(ISSUES_TABLE, ISSUES_STORE).map((issueId) => (
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
