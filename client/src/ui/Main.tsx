import React from 'react';
import {Repo} from './page/Repo';
import {Sidebar} from './sidebar/Sidebar';

export const Main = () => (
  <div id="main">
    <Sidebar />
    <Repo />
  </div>
);
