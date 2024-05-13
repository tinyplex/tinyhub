import {REPO_ID, UI_STORE} from '../../stores/UiStore';
import React from 'react';
import {useValue} from 'tinybase/debug/ui-react';

export const Page = () => (
  <div id="page">
    <header>
      <h1>{useValue(REPO_ID, UI_STORE)}</h1>
    </header>
    <div id="body">
      Information for {useValue(REPO_ID, UI_STORE)} goes here.
    </div>
  </div>
);
