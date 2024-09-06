/** @jsx createElement */

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
import {createElement, formatDate, formatNumber} from '../../../common';
import {repoHeader, repoHeaderSummary} from './index.css';
import {useRepoCell} from '../../../stores/ReposStore';
import {useUiValue} from '../../../stores/UiStore';

export const RepoHeader = () => {
  const repoId = useUiValue('repoId');
  const homepage = useRepoCell(repoId, 'homepage') as string;

  return (
    <Collapsible
      label={<b>Summary</b>}
      labelRight={
        <Axis>
          <Tag
            label={useRepoCell(repoId, 'visibility')}
            icon={Eye}
            variant="accent"
          />
          {useRepoCell(repoId, 'fork') ? (
            <Tag label="fork" icon={GitFork} variant="accent" />
          ) : null}
          {useRepoCell(repoId, 'archived') ? (
            <Tag label="archived" icon={Archive} variant="accent" />
          ) : null}
          {useRepoCell(repoId, 'disabled') ? (
            <Tag label="disabled" icon={ArchiveX} variant="accent" />
          ) : null}
        </Axis>
      }
      id="repoHeader"
      startOpen={true}
      className={repoHeader}
    >
      <Summary
        src={useRepoCell(repoId, 'avatarUrl') as string}
        label={useRepoCell(repoId, 'name')}
        className={repoHeaderSummary}
      >
        <p>{useRepoCell(repoId, 'description')}</p>
        <p>
          Created {formatDate(useRepoCell(repoId, 'createdAt'))}, updated{' '}
          {formatDate(useRepoCell(repoId, 'updatedAt'))}.
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
            Owner: useRepoCell(repoId, 'owner'),
            Language: useRepoCell(repoId, 'language'),
            License: useRepoCell(repoId, 'license'),
          }}
        />
      </Card>
      <Card>
        <Metric
          icon={Star}
          label="Stars"
          number={formatNumber(useRepoCell(repoId, 'stargazersCount'))}
        />
      </Card>
      <Card>
        <Metric
          icon={GitFork}
          label="Forks"
          number={formatNumber(useRepoCell(repoId, 'forksCount'))}
        />
      </Card>
      <Card>
        <Metric
          icon={CircleDot}
          label="Open issues"
          number={formatNumber(useRepoCell(repoId, 'openIssuesCount'))}
        />
      </Card>
    </Collapsible>
  );
};
