/** @jsx createElement */
/** @jsxFrag Fragment */

import {Button} from 'tinywidgets';
import {CircleHelp} from 'lucide-react';
import React from 'react';
import {logo} from './index.css.ts';

const {createElement, Fragment} = React;

export const Title = () => {
  return (
    <>
      <img src="/favicon.svg" alt="TinyHub logo" className={logo} />
      <h1>TinyHub</h1>
      <Button
        variant="icon"
        icon={CircleHelp}
        href="https://github.com/tinyplex/tinyhub"
        title="A local-first GitHub client, built in public."
      />
    </>
  );
};
