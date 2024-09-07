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
import {useRepoValue} from '../../../stores/RepoStore';

export const RepoHeader = () => {
  const homepage = useRepoValue('homepage') as string;

  return (
    <Collapsible
      label={<b>Summary</b>}
      labelRight={
        <Axis>
          <Tag label={useRepoValue('visibility')} icon={Eye} variant="accent" />
          {useRepoValue('fork') ? (
            <Tag label="fork" icon={GitFork} variant="accent" />
          ) : null}
          {useRepoValue('archived') ? (
            <Tag label="archived" icon={Archive} variant="accent" />
          ) : null}
          {useRepoValue('disabled') ? (
            <Tag label="disabled" icon={ArchiveX} variant="accent" />
          ) : null}
        </Axis>
      }
      id="repoHeader"
      startOpen={true}
      className={repoHeader}
    >
      <Summary
        src={useRepoValue('avatarUrl') as string}
        label={useRepoValue('name')}
        className={repoHeaderSummary}
      >
        <p>{useRepoValue('description')}</p>
        <p>
          Created {formatDate(useRepoValue('createdAt'))}, updated{' '}
          {formatDate(useRepoValue('updatedAt'))}.
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
            Owner: useRepoValue('owner'),
            Language: useRepoValue('language'),
            License: useRepoValue('license'),
          }}
        />
      </Card>
      <Card>
        <Metric
          icon={Star}
          label="Stars"
          number={formatNumber(useRepoValue('stargazersCount'))}
        />
      </Card>
      <Card>
        <Metric
          icon={GitFork}
          label="Forks"
          number={formatNumber(useRepoValue('forksCount'))}
        />
      </Card>
      <Card>
        <Metric
          icon={CircleDot}
          label="Open issues"
          number={formatNumber(useRepoValue('openIssuesCount'))}
        />
      </Card>
    </Collapsible>
  );
};
