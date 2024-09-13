/** @jsx createElement */
/** @jsxFrag Fragment */

import {Fragment, createElement} from '../../common.ts';
import {button, logo, spinning} from './index.css.ts';
import {Button} from 'tinywidgets';
import {CircleHelp} from 'lucide-react';
import {classNames} from 'tinywidgets/utils';
import {useIssuesPersisterStatus} from '../../stores/IssuesStore.tsx';
import {useRepoPersisterStatus} from '../../stores/RepoStore.tsx';
import {useReposPersisterStatus} from '../../stores/ReposStore.tsx';

export const Title = () => {
  const persisterStatus =
    useReposPersisterStatus() +
    useRepoPersisterStatus() +
    useIssuesPersisterStatus();

  return (
    <>
      <img
        src="/favicon.svg"
        alt="TinyHub logo"
        className={classNames(logo, persisterStatus > 0 && spinning)}
      />
      <h1>TinyHub</h1>
      <Button
        variant="icon"
        icon={CircleHelp}
        href="https://github.com/tinyplex/tinyhub"
        title="A local-first GitHub client, built in public."
        className={button}
      />
    </>
  );
};
