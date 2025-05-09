import {useRunningTaskRunIds, useScheduledTaskRunIds} from 'tinytick/ui-react';
import {footer} from './Footer.css';

export const Footer = () => {
  const scheduledCount = useScheduledTaskRunIds()?.length ?? 0;
  const runningCount = useRunningTaskRunIds()?.length ?? 0;
  return (
    <div className={footer}>
      {runningCount > 0
        ? `${runningCount} tasks running`
        : scheduledCount > 0
          ? `${scheduledCount} tasks scheduled`
          : 'Idle'}
    </div>
  );
};
