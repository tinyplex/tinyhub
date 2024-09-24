import {Archive, ArchiveX, CircleDot, Eye, GitFork, Star} from 'lucide-react';
import {
  Card,
  Collapsible,
  Detail,
  Hr,
  Metric,
  Row,
  Summary,
  Tag,
} from '../../../../../../tinywidgets/package/src';
import {formatDate, formatNumber} from '../../../common';
import React from 'react';
import {tags} from './index.css';
import {useRepoValue} from '../../../stores/RepoStore';

export const RepoHeader = () => {
  const homepage = useRepoValue('homepage') as string;

  return (
    <Collapsible
      title={<b>Summary</b>}
      titleRight={
        <div className={tags}>
          <Tag title={useRepoValue('visibility')} icon={Eye} variant="accent" />
          {useRepoValue('fork') ? (
            <Tag title="fork" icon={GitFork} variant="accent" />
          ) : null}
          {useRepoValue('archived') ? (
            <Tag title="archived" icon={Archive} variant="accent" />
          ) : null}
          {useRepoValue('disabled') ? (
            <Tag title="disabled" icon={ArchiveX} variant="accent" />
          ) : null}
        </div>
      }
      id="repoHeader"
      startOpen={true}
    >
      <Row variant="2|1">
        <Summary src={useRepoValue('avatarUrl') as string}>
          <h2>{useRepoValue('name')}</h2>
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
      </Row>
      <Hr />
      <Row variant="1|1|1">
        <Card>
          <Metric
            icon={Star}
            title="Stars"
            number={formatNumber(useRepoValue('stargazersCount'))}
          />
        </Card>
        <Card>
          <Metric
            icon={GitFork}
            title="Forks"
            number={formatNumber(useRepoValue('forksCount'))}
          />
        </Card>
        <Card>
          <Metric
            icon={CircleDot}
            title="Issues"
            number={formatNumber(useRepoValue('openIssuesCount'))}
          />
        </Card>
      </Row>
    </Collapsible>
  );
};
