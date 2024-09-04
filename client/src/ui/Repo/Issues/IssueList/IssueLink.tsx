/** @jsx createElement */

import {Button, Tag} from 'tinywidgets';
import {CircleDot, GitPullRequest} from 'lucide-react';
import {
  ISSUES_IS_PULL_REQUEST_CELL,
  ISSUES_STORE,
  ISSUES_TABLE,
  ISSUES_TITLE_CELL,
} from '../../../../stores/IssuesStore';
import {
  SCROLL_OPTIONS,
  createElement,
  useEffect,
  useRef,
} from '../../../common';
import {useCell} from 'tinybase/ui-react';
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
      icon={
        useCell(
          ISSUES_TABLE,
          issueId,
          ISSUES_IS_PULL_REQUEST_CELL,
          ISSUES_STORE,
        )
          ? GitPullRequest
          : CircleDot
      }
      label={useCell(ISSUES_TABLE, issueId, ISSUES_TITLE_CELL, ISSUES_STORE)}
      labelRight={<Tag label={`#${issueId}`} />}
      current={isCurrent}
    />
  );
};
