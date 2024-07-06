import {ISSUES_BODY_HTML_CELL, useIssueCell} from '../../../stores/IssuesStore';
import {ISSUE_ID_VALUE, UI_STORE} from '../../../stores/UiStore';
import React from 'react';
import {useValue} from 'tinybase/ui-react';

export const IssueBody = () => {
  const issueId = (useValue(ISSUE_ID_VALUE, UI_STORE) as string) ?? '';

  return (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: useIssueCell(issueId, ISSUES_BODY_HTML_CELL) ?? '',
      }}
    />
  );
};
