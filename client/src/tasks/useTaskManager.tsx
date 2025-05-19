import {createManager, getTaskRunReasonText} from 'tinytick';
import {useCreateManager} from 'tinytick/ui-react';

export const useTaskManager = () =>
  useCreateManager(() => {
    const manager = createManager()
      .setManagerConfig({tickInterval: 10})
      .setCategory('singleFetch', {
        maxDuration: 10000,
        maxRetries: 2,
        retryDelay: 5000,
      })
      .setCategory('multiFetch', {
        maxDuration: 120000,
        maxRetries: 2,
        retryDelay: 30000,
      })
      .start();

    if (import.meta.env.MODE === 'development') {
      manager.addTaskRunRunningListener(
        null,
        null,
        (_, taskId, taskRunId, running, reason) =>
          reason != 0 &&
          // eslint-disable-next-line no-console
          console.info(
            `Task ${taskId}/${taskRunId} ${running ? 'running' : 'stopped'}: ` +
              getTaskRunReasonText(reason) +
              ' ' +
              (manager.getTaskRunInfo(taskRunId)?.arg ?? ''),
          ),
      );

      manager.addTaskRunFailedListener(
        null,
        null,
        (_, taskId, taskRunId, reason, message) =>
          // eslint-disable-next-line no-console
          console.error(
            `Task ${taskId}/${taskRunId} failed: ` +
              `${getTaskRunReasonText(reason)} (${message}) ` +
              (manager.getTaskRunInfo(taskRunId)?.arg ?? ''),
          ),
      );
    }

    return manager;
  });
