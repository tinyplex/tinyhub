import {createLocalPersister} from 'tinybase/persisters/persister-browser/with-schemas';
import * as UiReact from 'tinybase/ui-react/with-schemas';
import {
  type NoTablesSchema,
  type Store,
  createStore,
} from 'tinybase/with-schemas';
import {useScheduleTaskRun, useSetTask} from 'tinytick/ui-react';
import {PER_PAGE} from './common';
import {hasToken, octokit} from './octokit';
import {useUiValue} from './ViewStore';

type RepoData = {
  full_name: string;
  owner: {login: string; avatar_url: string};
  name: string;
  archived?: boolean;
  created_at?: string | null;
  description: string | null;
  disabled?: boolean;
  fork: boolean;
  forks_count?: number;
  homepage?: string | null;
  html_url?: string | null;
  language?: string | null;
  license?: {name?: string} | null;
  open_issues_count?: number;
  size?: number;
  stargazers_count?: number;
  topics?: string[];
  updated_at?: string | null;
  visibility?: string;
};

const STORE_ID = 'repo';

const PERSISTER_ID = 'repo';

const VALUES_SCHEMA = {
  id: {type: 'string', default: ''},
  owner: {type: 'string', default: ''},
  avatarUrl: {type: 'string', default: ''},
  name: {type: 'string', default: ''},
  archived: {type: 'boolean', default: false},
  createdAt: {type: 'string', default: ''},
  description: {type: 'string', default: ''},
  disabled: {type: 'boolean', default: false},
  fork: {type: 'boolean', default: false},
  forksCount: {type: 'number', default: 0},
  homepage: {type: 'string', default: ''},
  githubUrl: {type: 'string', default: ''},
  language: {type: 'string', default: ''},
  license: {type: 'string', default: ''},
  openIssuesCount: {type: 'number', default: 0},
  size: {type: 'number', default: 0},
  stargazersCount: {type: 'number', default: 0},
  topics: {type: 'string', default: ''},
  updatedAt: {type: 'string', default: ''},
  visibility: {type: 'string', default: ''},
} as const;
type Schemas = [NoTablesSchema, typeof VALUES_SCHEMA];
const {
  useCreateStore,
  useProvideStore,
  useCreatePersister,
  usePersisterStatus,
  useValue,
} = UiReact as UiReact.WithSchemas<Schemas>;
type ValueIds = keyof typeof VALUES_SCHEMA;

export const useRepoValue = <ValueId extends ValueIds>(valueId: ValueId) =>
  useValue<ValueId>(valueId, STORE_ID);

export const useRepoPersisterStatus = () => usePersisterStatus(PERSISTER_ID);

export const RepoStore = () => {
  const currentRepoId = useUiValue('repoId');
  const repoStore = useCreateStore(
    () => createStore().setValuesSchema(VALUES_SCHEMA),
    [currentRepoId],
  );
  useProvideStore(STORE_ID, repoStore);

  useCreatePersister(
    repoStore,
    (repoStore) => {
      if (currentRepoId) {
        return createLocalPersister(repoStore, currentRepoId + '/' + STORE_ID);
      }
    },
    [currentRepoId],
    (persister) => persister?.startAutoPersisting(),
    [],
  );

  useFetch(repoStore, currentRepoId);

  return null;
};

const useFetch = (repoStore: Store<Schemas>, repoId: string) => {
  useSetTask(
    'fetchRepo',
    async (repoId: string = '') => {
      if (hasToken() && repoId) {
        const [owner, repo] = repoId.split('/');
        const {
          owner: ownerObject,
          name,
          archived,
          created_at,
          description,
          disabled,
          fork,
          forks_count,
          homepage,
          html_url,
          language,
          license,
          open_issues_count,
          size,
          stargazers_count,
          topics,
          updated_at,
          visibility,
        }: RepoData = (await octokit.rest.repos.get({owner, repo, ...PER_PAGE}))
          .data;

        repoStore.setValues({
          id: ownerObject.login + '/' + name,
          owner: ownerObject.login,
          avatarUrl: ownerObject.avatar_url,
          name,
          archived: archived ?? false,
          createdAt: created_at ?? '',
          description: description ?? '',
          disabled: disabled ?? false,
          fork,
          forksCount: forks_count ?? 0,
          githubUrl: html_url ?? '',
          homepage: homepage ?? '',
          language: language ?? '',
          license: license?.name ?? '',
          openIssuesCount: open_issues_count ?? 0,
          size: size ?? 0,
          stargazersCount: stargazers_count ?? 0,
          topics: topics?.join(', ') ?? '',
          updatedAt: updated_at ?? '',
          visibility: visibility ?? '',
        });
      }
    },
    [repoStore],
    'singleFetch',
  );

  useScheduleTaskRun('fetchRepo', repoId);
};
