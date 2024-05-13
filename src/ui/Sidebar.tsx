import React from 'react';
import {RepoAdd} from './RepoAdd';

export const Sidebar = () => (
  <nav id="sidebar">
    <ul id="repoList">
      <li>Repo 1</li>
      <li>Repo 2</li>
    </ul>
    <hr />
    <RepoAdd />
  </nav>
);
