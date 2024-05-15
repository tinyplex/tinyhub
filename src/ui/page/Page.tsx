import {FULL_NAME_VALUE, REPO_STORE, RepoStore} from '../../stores/RepoStore';
import {REPO_ID, UI_STORE} from '../../stores/UiStore';
import React from 'react';
import {useValue} from 'tinybase/debug/ui-react';

export const Page = () => {
  const currentRepoId = (useValue(REPO_ID, UI_STORE) as string) ?? '';

  const fullName = useValue(FULL_NAME_VALUE, REPO_STORE);

  return (
    <div id="page">
      {currentRepoId ? (
        <>
          <RepoStore repoId={currentRepoId} />
          <header>
            <h1>{fullName}</h1>
          </header>
          <div id="body">Information for {fullName} goes here.</div>
        </>
      ) : (
        <p>Please add a repo using the button on the left.</p>
      )}
    </div>
  );
};
