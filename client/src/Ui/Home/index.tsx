/** @jsx createElement */

import {Axis, Card, Hr} from 'tinywidgets';
import {card, logo} from './index.css';
import {RepoLink} from '../SideNav/RepoLink';
import {createElement} from '../../common';

export const Home = () => {
  return (
    <Card className={card}>
      <Axis vertical gap>
        <img src="/favicon.svg" alt="TinyHub logo" className={logo} />
        <h2>Welcome to TinyHub</h2>
        <p>
          Navigate to your own repos from the sidebar, or go directly to one of
          the popular ones below.
        </p>
        <Hr />
        <RepoLink repoId="facebook/react" hardcodedName="React" />
        <RepoLink repoId="vuejs/vue" hardcodedName="Vue" />
        <RepoLink repoId="tensorflow/tensorflow" hardcodedName="TensorFlow" />
        <RepoLink repoId="torvalds/linux" hardcodedName="Linux" />
        <RepoLink repoId="ohmyzsh/ohmyzsh" hardcodedName="Oh My Zsh" />
      </Axis>
    </Card>
  );
};
