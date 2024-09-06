/** @jsx createElement */

import {Avatar, Axis, Button} from 'tinywidgets';
import {LogOut} from 'lucide-react';
import {SiGithub} from '@icons-pack/react-simple-icons';
import {createElement} from '../../common';
import {useUserValue} from '../../stores/UserStore';

const login = () => location.assign('auth.html');
const logout = () => location.assign('auth.html?logout');

export const Auth = () => {
  const name = useUserValue('name');
  const avatarUrl = useUserValue('avatarUrl');

  return name ? (
    <Axis>
      {avatarUrl ? <Avatar src={avatarUrl} title={name} /> : null}
      <Button onClick={logout} icon={LogOut} label="Logout" />
    </Axis>
  ) : (
    <Button onClick={login} icon={SiGithub} label="Login" variant="accent" />
  );
};
