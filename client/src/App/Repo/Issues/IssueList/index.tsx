import {IssueLink} from './IssueLink';
import React from 'react';

export const IssueList = ({
  currentIssueId,
  issueIds,
}: {
  readonly currentIssueId: string;
  readonly issueIds: string[];
}) => {
  return issueIds.map((issueId) => (
    <IssueLink
      key={issueId}
      issueId={issueId}
      isCurrent={issueId == currentIssueId}
    />
  ));
};
