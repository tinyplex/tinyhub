import {CircleDot} from 'lucide-react';
import React, {useEffect} from 'react';
import {Card, Collapsible, Row, Tag} from 'tinywidgets';
import {useIssueCell, useIssuesSortedRowIds} from '../../../stores/IssuesStore';
import {useRepoCell} from '../../../stores/ReposStore';
import {useSettingsValue} from '../../../stores/SettingsStore';
import {useSetUiValueCallback, useUiValue} from '../../../stores/ViewStore';
import {issue, issueList} from './index.css';
import {Issue} from './Issue';
import {IssueList} from './IssueList';

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
