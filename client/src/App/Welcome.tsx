/** @jsx createElement */

import {Card, Hr} from 'tinywidgets';
import {card, logo} from './Welcome.css';
import {Auth} from './Auth';
import {createElement} from '../common';

export const Welcome = () => {
  return (
    <Card className={card}>
      <img src="/favicon.svg" alt="TinyHub logo" className={logo} />
      <h2>Welcome to TinyHub</h2>
      <p>TinyHub is a local-first GitHub client, built in public.</p>
      <Hr />
      <p>Login with GitHub to get started.</p>
      <Auth />
    </Card>
  );
};
