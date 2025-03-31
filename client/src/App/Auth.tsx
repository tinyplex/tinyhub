import {SiGithub} from '@icons-pack/react-simple-icons';
import {LogOut} from 'lucide-react';
import {Button, Image} from 'tinywidgets';
import {useUserValue} from '../stores/UserStore';
import {auth} from './Auth.css';

const login = () => location.assign('auth.html');
const logout = () => location.assign('auth.html?logout');

export const Auth = () => {
  const name = useUserValue('name');
  const avatarUrl = useUserValue('avatarUrl');

  return name ? (
    <div className={auth}>
      {avatarUrl ? <Image variant="avatar" src={avatarUrl} alt={name} /> : null}
      <Button onClick={logout} icon={LogOut} title="Logout" />
    </div>
  ) : (
    <Button onClick={login} icon={SiGithub} title="Login" variant="accent" />
  );
};
