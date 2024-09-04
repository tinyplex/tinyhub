/** @jsx createElement */

import {Card, Collapsible, Tag} from 'tinywidgets';
import {ISSUES_STORE, ISSUES_TABLE} from '../../../stores/IssuesStore';
import {ISSUE_ID_VALUE, REPO_ID_VALUE, UI_STORE} from '../../../stores/UiStore';
import {
  REPOS_OPEN_ISSUES_COUNT_CELL,
  useRepoCell,
} from '../../../stores/ReposStore';
import {issue, issueList, issues} from './index.css';
import {useHasRow, useValue} from 'tinybase/ui-react';
import {CircleDot} from 'lucide-react';
import {Issue} from './Issue';
import {IssueList} from './IssueList';
import {createElement} from '../../common';

export const Issues = () => {
  const repoId = (useValue(REPO_ID_VALUE, UI_STORE) as string) ?? '';
  const issueId = (useValue(ISSUE_ID_VALUE, UI_STORE) as string) ?? '';
  return (
    <Collapsible
      id="issues"
      label="Issues"
      className={issues}
      labelRight={
        <Tag
          icon={CircleDot}
          variant="accent"
          label={useRepoCell(repoId, REPOS_OPEN_ISSUES_COUNT_CELL)}
        />
      }
    >
      <Card className={issueList}>
        <IssueList currentIssueId={issueId} />
      </Card>
      {useHasRow(ISSUES_TABLE, issueId, ISSUES_STORE) ? (
        <Card className={issue}>
          <Issue issueId={issueId} />
        </Card>
      ) : null}
    </Collapsible>
  );
};
