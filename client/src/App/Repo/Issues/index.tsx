import {Card, Collapsible, Row, Tag} from 'tinywidgets';
import React, {useEffect} from 'react';
import {issue, issueList} from './index.css';
import {useIssueCell, useIssuesSortedRowIds} from '../../../stores/IssuesStore';
import {useSetUiValueCallback, useUiValue} from '../../../stores/ViewStore';
import {CircleDot} from 'lucide-react';
import {Issue} from './Issue';
import {IssueList} from './IssueList';
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
      title="Issues"
      titleRight={
        <Tag
          icon={CircleDot}
          variant="accent"
          title={useRepoCell(repoId, 'openIssuesCount')}
        />
      }
    >
      <Row variant="1|2">
        <Card className={issueList}>
          <IssueList currentIssueId={issueId} issueIds={issueIds} />
        </Card>
        {useIssueCell(issueId, 'title') ? (
          <Card className={issue}>
            <Issue issueId={issueId} />
          </Card>
        ) : null}
      </Row>
    </Collapsible>
  );
};
