import {Card, Hr} from 'tinywidgets';
import {Auth} from './Auth';
import {card, logo} from './Welcome.css';

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
