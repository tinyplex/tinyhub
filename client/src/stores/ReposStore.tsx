import {
  type Store,
  type Table,
  createCustomPersister,
  createStore,
} from 'tinybase/debug';
import {hasToken, octokit} from './octokit';
import {
  useCreatePersister,
  useCreateStore,
  useProvideStore,
} from 'tinybase/debug/ui-react';
import {REFRESH_INTERVAL} from './common';
import {createLocalPersister} from 'tinybase/debug/persisters/persister-browser';

type RepoData = {
  full_name: string;
  owner: {login: string};
  name: string;
  archived?: boolean;
  created_at?: string | null;
  description: string | null;
  disabled?: boolean;
  fork: boolean;
  forks_count?: number;
  homepage?: string | null;
  language?: string | null;
  license?: {name?: string} | null;
  open_issues_count?: number;
  pushed_at?: string | null;
  size?: number;
  stargazers_count?: number;
  topics?: string[];
  updated_at?: string | null;
  visibility?: string;
};

export const REPOS_STORE = 'repos';

export const REPOS_TABLE = 'repos';
export const REPOS_GROUP_CELL = 'group';
export const REPOS_OWNER_CELL = 'owner';
export const REPOS_NAME_CELL = 'name';
export const REPOS_ARCHIVED_CELL = 'archived';
export const REPOS_CREATED_AT_CELL = 'createdAt';
export const REPOS_DESCRIPTION_CELL = 'description';
export const REPOS_DISABLED_CELL = 'disabled';
export const REPOS_FORK_CELL = 'fork';
export const REPOS_FORKS_COUNT_CELL = 'forksCount';
export const REPOS_HOMEPAGE_CELL = 'homepage';
export const REPOS_LANGUAGE_CELL = 'language';
export const REPOS_LICENSE_CELL = 'license';
export const REPOS_OPEN_ISSUES_COUNT_CELL = 'openIssuesCount';
export const REPOS_PUSHED_AT_CELL = 'pushedAt';
export const REPOS_SIZE_CELL = 'size';
export const REPOS_STARGAZERS_COUNT_CELL = 'stargazersCount';
export const REPOS_TOPICS_CELL = 'topics';
export const REPOS_UPDATED_AT_CELL = 'updatedAt';
export const REPOS_VISIBILITY_CELL = 'visibility';

export const STARRED_GROUP = 'Starred';

export const ReposStore = () => {
  const reposStore = useCreateStore(createStore);
  useCreatePersister(
    reposStore,
    (reposStore) => createLocalPersister(reposStore, REPOS_STORE),
    [],
    async (persister) => {
      await persister.startAutoLoad();
      await persister.startAutoSave();
    },
  );

  useCreatePersister(
    reposStore,
    (reposStore) => {
      return createGithubReposLoadingPersister(reposStore);
    },
    [],
    async (persister) => {
      await persister?.load();
    },
    [],
  );

  useProvideStore(REPOS_STORE, reposStore);
  return null;
};
const PER_PAGE = {per_page: 100};

const createGithubReposLoadingPersister = (store: Store) =>
  createCustomPersister(
    store,
    async () => {
      if (hasToken()) {
        const reposTable: Table = {};

        const addRepo = (
          {
            full_name,
            owner,
            name,
            archived,
            created_at,
            description,
            disabled,
            fork,
            forks_count,
            homepage,
            language,
            license,
            open_issues_count,
            pushed_at,
            size,
            stargazers_count,
            topics,
            updated_at,
            visibility,
          }: RepoData,
          group: string = owner.login,
        ) => {
          reposTable[full_name] = {
            [REPOS_GROUP_CELL]: group,
            [REPOS_OWNER_CELL]: owner.login,
            [REPOS_NAME_CELL]: name,
            [REPOS_ARCHIVED_CELL]: archived ?? false,
            [REPOS_CREATED_AT_CELL]: created_at ?? '',
            [REPOS_DESCRIPTION_CELL]: description ?? '',
            [REPOS_DISABLED_CELL]: disabled ?? false,
            [REPOS_FORK_CELL]: fork,
            [REPOS_FORKS_COUNT_CELL]: forks_count ?? 0,
            [REPOS_HOMEPAGE_CELL]: homepage ?? '',
            [REPOS_LANGUAGE_CELL]: language ?? '',
            [REPOS_LICENSE_CELL]: license?.name ?? '',
            [REPOS_OPEN_ISSUES_COUNT_CELL]: open_issues_count ?? 0,
            [REPOS_PUSHED_AT_CELL]: pushed_at ?? '',
            [REPOS_SIZE_CELL]: size ?? 0,
            [REPOS_STARGAZERS_COUNT_CELL]: stargazers_count ?? 0,
            [REPOS_TOPICS_CELL]: topics?.join(', ') ?? '',
            [REPOS_UPDATED_AT_CELL]: updated_at ?? '',
            [REPOS_VISIBILITY_CELL]: visibility ?? '',
          };
        };

        (
          await octokit.rest.activity.listReposStarredByAuthenticatedUser(
            PER_PAGE,
          )
        ).data.forEach((repo) => addRepo(repo, STARRED_GROUP));

        (
          await octokit.rest.repos.listForAuthenticatedUser(PER_PAGE)
        ).data.forEach((repo) => addRepo(repo));

        await Promise.all(
          (await octokit.rest.orgs.listForAuthenticatedUser(PER_PAGE)).data.map(
            async ({login}) => {
              const repos = await octokit.rest.repos.listForOrg({
                org: login,
                ...PER_PAGE,
              });
              repos.data.forEach((repo) => addRepo(repo));
            },
          ),
        );

        return [{[REPOS_TABLE]: reposTable}, {}];
      }
      return [{}, {}];
    },
    async () => {},
    (listener) => setInterval(listener, REFRESH_INTERVAL),
    (intervalId) => clearInterval(intervalId),
  );
