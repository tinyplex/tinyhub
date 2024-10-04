import {CircleDot, GitPullRequest} from 'lucide-react';
import {Hr, Summary} from 'tinywidgets';
import React from 'react';
import {formatDate} from '../../../common';
import {useIssueCell} from '../../../stores/IssuesStore';

export const Issue = ({issueId}: {readonly issueId: string}) => {
  return (
    <>
      <Summary
        icon={useIssueCell(issueId, 'pullRequest') ? GitPullRequest : CircleDot}
      >
        <h2>{useIssueCell(issueId, 'title')}</h2>
        <p>Created {formatDate(useIssueCell(issueId, 'createdAt'))}.</p>
        <p>Updated {formatDate(useIssueCell(issueId, 'updatedAt'))}.</p>
      </Summary>
      <Hr />
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: useIssueCell(issueId, 'bodyHtml') ?? '',
        }}
      />
    </>
  );
};
