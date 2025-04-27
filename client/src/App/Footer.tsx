import {useRunningTaskRunIds, useScheduledTaskRunIds} from 'tinytick/ui-react';
import {footer} from './Footer.css';

export const Footer = () => {
  const scheduledCount = useScheduledTaskRunIds()?.length ?? 0;
  const runningCount = useRunningTaskRunIds()?.length ?? 0;
  return (
    <div className={footer}>
      {scheduledCount > 0 || runningCount > 0
        ? `Tasks: ${runningCount} running, ${scheduledCount} scheduled`
        : 'Idle'}
    </div>
  );
};
