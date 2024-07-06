import {PER_PAGE, REFRESH_INTERVAL} from './common';
import {REPO_ID_VALUE, UI_STORE} from './UiStore';
import {
  type Store,
  type Table,
  createCustomPersister,
  createStore,
} from 'tinybase';
import {
  useCell,
  useCreatePersister,
  useCreateStore,
  useProvideStore,
  useValue,
} from 'tinybase/ui-react';
import {createLocalPersister} from 'tinybase/persisters/persister-browser';
import {octokit} from './octokit';

export const ISSUES_STORE = 'issues';

export const ISSUES_TABLE = 'issues';
export const ISSUES_TITLE_CELL = 'title';
export const ISSUES_IS_PULL_REQUEST_CELL = 'pullRequest';
export const ISSUES_BODY_HTML_CELL = 'bodyHtml';
export const ISSUES_CREATED_AT_CELL = 'createdAt';
export const ISSUES_UPDATED_AT_CELL = 'updatedAt';

export const IssuesStore = () => {
  const currentRepoId = (useValue(REPO_ID_VALUE, UI_STORE) as string) ?? '';

  const issuesStore = useCreateStore(createStore, [currentRepoId]);
  useCreatePersister(
    issuesStore,
    (issuesStore) => {
      if (currentRepoId) {
        return createLocalPersister(
          issuesStore,
          currentRepoId + '/' + ISSUES_STORE,
        );
      }
    },
    [currentRepoId],
    async (persister) => {
      await persister?.startAutoLoad();
      await persister?.startAutoSave();
    },
    [],
  );

  useCreatePersister(
    issuesStore,
    (issuesStore) => {
      if (currentRepoId) {
        return createGithubIssuesLoadingPersister(issuesStore, currentRepoId);
      }
    },
    [currentRepoId],
    async (persister) => {
      await persister?.load();
    },
    [],
  );

  useProvideStore(ISSUES_STORE, issuesStore);
  return null;
};

export const useIssueCell = (issueId: string, cellId: string) =>
  useCell(ISSUES_TABLE, issueId, cellId, ISSUES_STORE);

const createGithubIssuesLoadingPersister = (store: Store, repoId: string) =>
  createCustomPersister(
    store,
    async () => {
      const [owner, repo] = repoId.split('/');
      const issuesTable: Table = {};
      (
        await octokit.rest.issues.listForRepo({
          owner,
          repo,
          mediaType: {format: 'html'},
          ...PER_PAGE,
        })
      ).data.forEach(
        ({number, title, pull_request, body_html, created_at, updated_at}) =>
          (issuesTable[number] = {
            [ISSUES_TITLE_CELL]: title,
            [ISSUES_IS_PULL_REQUEST_CELL]: pull_request != undefined,
            [ISSUES_BODY_HTML_CELL]: body_html ?? '',
            [ISSUES_CREATED_AT_CELL]: created_at,
            [ISSUES_UPDATED_AT_CELL]: updated_at,
          }),
      );
      return [{[ISSUES_TABLE]: issuesTable}, {}];
    },
    async () => {},
    (listener) => setInterval(listener, REFRESH_INTERVAL),
    (intervalId) => clearInterval(intervalId),
  );
