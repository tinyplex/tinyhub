import {ISSUES_STORE, ISSUES_TABLE} from '../../../stores/IssuesStore';
import {ISSUE_ID_VALUE, UI_STORE} from '../../../stores/UiStore';
import {useHasRow, useValue} from 'tinybase/ui-react';
import {IssueBody} from './IssueBody';
import {IssueHeader} from './IssueHeader';
import React from 'react';

export const Issue = () => {
  const issueId = (useValue(ISSUE_ID_VALUE, UI_STORE) as string) ?? '';
  const hasIssue = useHasRow(ISSUES_TABLE, issueId, ISSUES_STORE);

  return (
    <main id="issue">
      {hasIssue ? (
        <>
          <IssueHeader />
          <IssueBody />
        </>
      ) : null}
    </main>
  );
};
