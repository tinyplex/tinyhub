import {REPO_ID, UI_STORE} from '../../stores/UiStore';
import {REPO_STORE, REPO_VALUE, RepoStore} from '../../stores/RepoStore';
import React from 'react';
import {useValue} from 'tinybase/debug/ui-react';

export const Page = () => {
  const currentRepoId = (useValue(REPO_ID, UI_STORE) as string) ?? '';

  const name = useValue(REPO_VALUE, REPO_STORE);

  return (
    <div id="page">
      {currentRepoId ? (
        <>
          <RepoStore repoId={currentRepoId} />
          <header>
            <h1>{name}</h1>
          </header>
          <div id="body">Information for {name} goes here.</div>
        </>
      ) : (
        <p>Please add a repo using the button on the left.</p>
      )}
    </div>
  );
};
