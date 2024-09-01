/** @jsx createElement */
/** @jsxFrag Fragment */

import {info, logo} from './index.css.ts';
import React from 'react';

const {createElement, Fragment} = React;

export const Title = () => {
  return (
    <>
      <img src="/favicon.svg" alt="TinyHub logo" className={logo} />
      <h1>TinyHub</h1>
      <a
        className={info}
        href="https://github.com/tinyplex/tinyhub"
        title="A local-first GitHub client, built in public."
        target="_blank"
        rel="noreferrer"
      />
    </>
  );
};
