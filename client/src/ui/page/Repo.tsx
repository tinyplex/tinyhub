import {REPOS_STORE, REPOS_TABLE} from '../../stores/ReposStore';
import {REPO_ID_VALUE, UI_STORE} from '../../stores/UiStore';
import {useHasRow, useValue} from 'tinybase/debug/ui-react';
import {Issue} from './Issue';
import {Issues} from './Issues';
import {IssuesStore} from '../../stores/IssuesStore';
import React from 'react';
import {RepoAside} from './RepoAside';
import {RepoHeader} from './RepoHeader';

export const Repo = () => {
  const repoId = (useValue(REPO_ID_VALUE, UI_STORE) as string) ?? '';
  const hasRepo = useHasRow(REPOS_TABLE, repoId, REPOS_STORE);

  return (
    <div id="repo">
      {hasRepo ? (
        <>
          <IssuesStore />
          <RepoHeader />
          <RepoAside />
          <Issues />
          <Issue />
        </>
      ) : null}
    </div>
  );
};
