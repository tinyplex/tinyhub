import {Page} from './Page';
import React from 'react';
import {Sidebar} from './Sidebar';

export const Main = () => (
  <div id="main">
    <Sidebar />
    <Page />
  </div>
);
