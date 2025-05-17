import type {Ids} from 'tinytick';
import {
  useManager,
  useRunningTaskRunIds,
  useScheduledTaskRunIds,
} from 'tinytick/ui-react';
import {footer} from './Footer.css';

export const Footer = () => {
  const scheduledTaskRunIds = useScheduledTaskRunIds() ?? [];
  const scheduledTaskIds = useTaskIds(scheduledTaskRunIds);
  const scheduledCount = scheduledTaskRunIds.length;

  const runningTaskRunIds = useRunningTaskRunIds() ?? [];
  const runningTaskIds = useTaskIds(runningTaskRunIds);
  const runningCount = runningTaskRunIds.length;

  return (
    <div className={footer}>
      {runningCount > 0 ? (
        <div title={runningTaskIds}>{runningCount} tasks running</div>
      ) : scheduledCount > 0 ? (
        <div title={scheduledTaskIds}>{scheduledCount} tasks scheduled</div>
      ) : (
        'Idle'
      )}
    </div>
  );
};

const useTaskIds = (taskRunIds: Ids) => {
  const manager = useManager();
  return taskRunIds
    .map((taskRunId) => {
      const {taskId, nextTimestamp = 0} =
        manager?.getTaskRunInfo(taskRunId) ?? {};
      return `• ${taskId} (${new Date(nextTimestamp).toLocaleTimeString()})`;
    })
    .join('\n');
};
