/** @jsx createElement */

import {Card, Collapsible, Tag} from 'tinywidgets';
import {issue, issueList, issues} from './index.css';
import {useIssueCell, useIssuesSortedRowIds} from '../../../stores/IssuesStore';
import {useSetUiValueCallback, useUiValue} from '../../../stores/ViewStore';
import {CircleDot} from 'lucide-react';
import {Issue} from './Issue';
import {IssueList} from './IssueList';
import {createElement} from '../../../common';
import {useEffect} from 'react';
import {useRepoCell} from '../../../stores/ReposStore';
import {useSettingsValue} from '../../../stores/SettingsStore';

export const Issues = () => {
  const repoId = useUiValue('repoId');
  const issueId = useUiValue('issueId');

  const issuesSortCell = useSettingsValue('issuesSortCell');
  const issuesSortAscending = issuesSortCell == 'title';
  const issueIds = useIssuesSortedRowIds(
    issuesSortCell as any,
    !issuesSortAscending,
  );

  const setIssueId = useSetUiValueCallback(
    'issueId',
    (issueId: string) => issueId,
  );
  useEffect(() => {
    if (issueIds.length > 0 && (issueId == '' || !issueIds.includes(issueId))) {
      setIssueId(issueIds[0]);
    }
  }, [issueIds, issueId, setIssueId]);

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
        <IssueList currentIssueId={issueId} issueIds={issueIds} />
      </Card>
      {useIssueCell(issueId, 'title') ? (
        <Card className={issue}>
          <Issue issueId={issueId} />
        </Card>
      ) : null}
    </Collapsible>
  );
};
