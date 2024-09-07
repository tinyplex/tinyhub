/** @jsx createElement */

import {Card, Collapsible, Tag} from 'tinywidgets';
import {issue, issueList, issues} from './index.css';
import {CircleDot} from 'lucide-react';
import {Issue} from './Issue';
import {IssueList} from './IssueList';
import {createElement} from '../../../common';
import {useIssueCell} from '../../../stores/IssuesStore';
import {useRepoCell} from '../../../stores/ReposStore';
import {useUiValue} from '../../../stores/ViewStore';

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
          label={useRepoCell(repoId, 'openIssuesCount')}
        />
      }
    >
      <Card className={issueList}>
        <IssueList currentIssueId={issueId} />
      </Card>
      {useIssueCell(issueId, 'title') ? (
        <Card className={issue}>
          <Issue issueId={issueId} />
        </Card>
      ) : null}
    </Collapsible>
  );
};
