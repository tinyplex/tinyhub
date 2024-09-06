/** @jsx createElement */
/** @jsxFrag Fragment */

import {CircleDot, GitPullRequest} from 'lucide-react';
import {Fragment, createElement, formatDate} from '../../../../common';
import {Hr, Summary} from 'tinywidgets';
import {useIssueCell} from '../../../../stores/IssuesStore';

export const Issue = ({issueId}: {readonly issueId: string}) => {
  return (
    <>
      <Summary
        label={useIssueCell(issueId, 'title')}
        icon={useIssueCell(issueId, 'pullRequest') ? GitPullRequest : CircleDot}
      >
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
