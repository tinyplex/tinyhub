import {Page} from './page/Page';
import React from 'react';
import {Sidebar} from './sidebar/Sidebar';

export const Main = () => (
  <div id="main">
    <Sidebar />
    <Page />
  </div>
);
