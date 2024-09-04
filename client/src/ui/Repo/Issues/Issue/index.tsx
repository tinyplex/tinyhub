import {CircleDot, GitPullRequest} from 'lucide-react';
import {Hr, Summary} from 'tinywidgets';
import {
  ISSUES_BODY_HTML_CELL,
  ISSUES_CREATED_AT_CELL,
  ISSUES_IS_PULL_REQUEST_CELL,
  ISSUES_TITLE_CELL,
  ISSUES_UPDATED_AT_CELL,
  useIssueCell,
} from '../../../../stores/IssuesStore';
import React from 'react';
import {formatDate} from '../../../common/common';

export const Issue = ({issueId}: {readonly issueId: string}) => {
  return (
    <>
      <Summary
        label={useIssueCell(issueId, ISSUES_TITLE_CELL)}
        icon={
          useIssueCell(issueId, ISSUES_IS_PULL_REQUEST_CELL)
            ? GitPullRequest
            : CircleDot
        }
      >
        <p>
          Created {formatDate(useIssueCell(issueId, ISSUES_CREATED_AT_CELL))}.
        </p>
        <p>
          Updated {formatDate(useIssueCell(issueId, ISSUES_UPDATED_AT_CELL))}.
        </p>
      </Summary>
      <Hr />
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: useIssueCell(issueId, ISSUES_BODY_HTML_CELL) ?? '',
        }}
      />
    </>
  );
};
