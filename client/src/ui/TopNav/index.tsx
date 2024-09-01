/** @jsx createElement */
/** @jsxFrag Fragment */

import {Auth} from './Auth';
import React from 'react';

const {createElement, Fragment} = React;

export const TopNav = () => {
  return (
    <>
      <span />
      <Auth />
    </>
  );
};
