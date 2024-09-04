/** @jsx createElement */

import {Card, Collapsible, Tag} from 'tinywidgets';
import {ISSUES_STORE, ISSUES_TABLE} from '../../../stores/IssuesStore';
import {
  REPOS_OPEN_ISSUES_COUNT_CELL,
  useRepoCell,
} from '../../../stores/ReposStore';
import {issue, issueList, issues} from './index.css';
import {CircleDot} from 'lucide-react';
import {Issue} from './Issue';
import {IssueList} from './IssueList';
import {createElement} from '../../common';
import {useHasRow} from 'tinybase/ui-react';
import {useUiValue} from '../../../stores/UiStore';

export const Issues = () => {
  const repoId = useUiValue('repoId');
  const issueId = useUiValue('issueId');
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
