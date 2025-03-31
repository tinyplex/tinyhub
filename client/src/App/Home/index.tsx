import {Card, Hr} from 'tinywidgets';
import {RepoLink} from '../SideNav/RepoLink';
import {card, logo} from './index.css';

export const Home = () => {
  return (
    <Card className={card}>
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
    </Card>
  );
};
