import {Archive, ArchiveX, CircleDot, Eye, GitFork, Star} from 'lucide-react';
import {
  Axis,
  Card,
  Collapsible,
  Detail,
  Metric,
  Summary,
  Tag,
} from 'tinywidgets';
import {
  REPOS_ARCHIVED_CELL,
  REPOS_AVATAR_URL_CELL,
  REPOS_CREATED_AT_CELL,
  REPOS_DESCRIPTION_CELL,
  REPOS_DISABLED_CELL,
  REPOS_FORKS_COUNT_CELL,
  REPOS_FORK_CELL,
  REPOS_HOMEPAGE_CELL,
  REPOS_LANGUAGE_CELL,
  REPOS_LICENSE_CELL,
  REPOS_NAME_CELL,
  REPOS_OPEN_ISSUES_COUNT_CELL,
  REPOS_OWNER_CELL,
  REPOS_STARGAZERS_COUNT_CELL,
  REPOS_UPDATED_AT_CELL,
  REPOS_VISIBILITY_CELL,
  useRepoCell,
} from '../../../stores/ReposStore';
import {REPO_ID_VALUE, UI_STORE} from '../../../stores/UiStore';
import {formatDate, formatNumber} from '../../common/common';
import {repoHeader, repoHeaderSummary} from './index.css';
import React from 'react';
import {useValue} from 'tinybase/ui-react';

export const RepoHeader = () => {
  const repoId = (useValue(REPO_ID_VALUE, UI_STORE) as string) ?? '';
  const homepage = useRepoCell(repoId, REPOS_HOMEPAGE_CELL) as string;

  return (
    <Collapsible
      label={<b>Summary</b>}
      labelRight={
        <Axis>
          <Tag
            label={useRepoCell(repoId, REPOS_VISIBILITY_CELL)}
            icon={Eye}
            variant="accent"
          />
          {useRepoCell(repoId, REPOS_FORK_CELL) ? (
            <Tag label="fork" icon={GitFork} variant="accent" />
          ) : null}
          {useRepoCell(repoId, REPOS_ARCHIVED_CELL) ? (
            <Tag label="archived" icon={Archive} variant="accent" />
          ) : null}
          {useRepoCell(repoId, REPOS_DISABLED_CELL) ? (
            <Tag label="disabled" icon={ArchiveX} variant="accent" />
          ) : null}
        </Axis>
      }
      id="repoHeader"
      className={repoHeader}
    >
      <Summary
        src={useRepoCell(repoId, REPOS_AVATAR_URL_CELL) as string}
        label={useRepoCell(repoId, REPOS_NAME_CELL)}
        className={repoHeaderSummary}
      >
        <p>{useRepoCell(repoId, REPOS_DESCRIPTION_CELL)}</p>
        <p>
          Created {formatDate(useRepoCell(repoId, REPOS_CREATED_AT_CELL))},
          updated {formatDate(useRepoCell(repoId, REPOS_UPDATED_AT_CELL))}.
        </p>
        {homepage ? (
          <p>
            <a href={homepage} target="_blank" rel="noreferrer">
              {homepage}
            </a>
          </p>
        ) : null}
      </Summary>
      <Card>
        <Detail
          data={{
            Owner: useRepoCell(repoId, REPOS_OWNER_CELL),
            Language: useRepoCell(repoId, REPOS_LANGUAGE_CELL),
            License: useRepoCell(repoId, REPOS_LICENSE_CELL),
          }}
        />
      </Card>
      <Card>
        <Metric
          icon={Star}
          label="Stars"
          number={formatNumber(
            useRepoCell(repoId, REPOS_STARGAZERS_COUNT_CELL),
          )}
        />
      </Card>
      <Card>
        <Metric
          icon={GitFork}
          label="Forks"
          number={formatNumber(useRepoCell(repoId, REPOS_FORKS_COUNT_CELL))}
        />
      </Card>
      <Card>
        <Metric
          icon={CircleDot}
          label="Open issues"
          number={formatNumber(
            useRepoCell(repoId, REPOS_OPEN_ISSUES_COUNT_CELL),
          )}
        />
      </Card>
    </Collapsible>
  );
};
