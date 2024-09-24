import {Button, Tag} from 'tinywidgets';
import {CircleDot, GitPullRequest} from 'lucide-react';
import {SCROLL_OPTIONS, useEffect, useRef} from '../../../../common';
import React from 'react';
import {useIssueCell} from '../../../../stores/IssuesStore';
import {useSetUiValueCallback} from '../../../../stores/ViewStore';

export const IssueLink = ({
  issueId,
  isCurrent,
}: {
  readonly issueId: string;
  readonly isCurrent: boolean;
}) => {
  const handleClick = useSetUiValueCallback('issueId', () => issueId, [
    issueId,
  ]);

  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (isCurrent) {
      ref.current?.scrollIntoView(SCROLL_OPTIONS);
    }
  }, [isCurrent]);

  return (
    <Button
      variant="item"
      ref={ref}
      onClick={handleClick}
      icon={useIssueCell(issueId, 'pullRequest') ? GitPullRequest : CircleDot}
      title={useIssueCell(issueId, 'title')}
      titleRight={<Tag title={`#${issueId}`} />}
      current={isCurrent}
    />
  );
};
