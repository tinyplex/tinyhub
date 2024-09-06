/** @jsx createElement */

import {Button, Tag} from 'tinywidgets';
import {CircleDot, GitPullRequest} from 'lucide-react';
import {
  SCROLL_OPTIONS,
  createElement,
  useEffect,
  useRef,
} from '../../../../common';
import {useIssueCell} from '../../../../stores/IssuesStore';
import {useSetUiValueCallback} from '../../../../stores/UiStore';

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
      label={useIssueCell(issueId, 'title')}
      labelRight={<Tag label={`#${issueId}`} />}
      current={isCurrent}
    />
  );
};
