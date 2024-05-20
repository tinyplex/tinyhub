import {REPOS_STORE, REPOS_TABLE} from '../../stores/ReposStore';
import {REPO_ID_VALUE, UI_STORE} from '../../stores/UiStore';
import {useHasRow, useValue} from 'tinybase/debug/ui-react';
import {Issue} from './issues/Issue';
import {Issues} from './issues/Issues';
import {IssuesStore} from '../../stores/IssuesStore';
import React from 'react';
import {RepoHeader} from './RepoHeader';
import {RepoMetadata} from './RepoMetadata';

export const Repo = () => {
  const repoId = (useValue(REPO_ID_VALUE, UI_STORE) as string) ?? '';
  const hasRepo = useHasRow(REPOS_TABLE, repoId, REPOS_STORE);

  return (
    <div id="repo">
      {hasRepo ? (
        <>
          <IssuesStore />
          <RepoHeader />
          <RepoMetadata />
          <Issues />
          <Issue />
        </>
      ) : null}
    </div>
  );
};
