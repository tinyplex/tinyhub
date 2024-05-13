import React from 'react';
import {useUiRepoId} from '../../stores/UiStore';

export const Page = () => (
  <div id="page">
    <header>
      <h1>{useUiRepoId()}</h1>
    </header>
    <div id="body">Information for {useUiRepoId()} goes here.</div>
  </div>
);
