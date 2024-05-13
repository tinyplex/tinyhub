import {REPO_ID, UI_STORE} from '../../stores/UiStore';
import React from 'react';
import {useValue} from 'tinybase/debug/ui-react';

export const Page = () => {
  const currentRepoId = (useValue(REPO_ID, UI_STORE) as string) ?? '';

  return (
    <div id="page">
      {currentRepoId ? (
        <>
          <header>
            <h1>{currentRepoId}</h1>
          </header>
          <div id="body">Information for {currentRepoId} goes here.</div>
        </>
      ) : (
        <p>Please add a repo using the button on the left.</p>
      )}
    </div>
  );
};
