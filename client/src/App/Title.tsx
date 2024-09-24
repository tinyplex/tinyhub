import {Button, classNames} from 'tinywidgets';
import {button, logo, spinning} from './Title.css.ts';
import {CircleHelp} from 'lucide-react';
import React from 'react';
import {useIssuesPersisterStatus} from '../stores/IssuesStore.tsx';
import {useRepoPersisterStatus} from '../stores/RepoStore.tsx';
import {useReposPersisterStatus} from '../stores/ReposStore.tsx';

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
        alt="A local-first GitHub client, built in public."
        className={button}
      />
    </>
  );
};
