import {AVATAR_URL_VALUE, NAME_VALUE, USER_STORE} from '../../stores/UserStore';
import {Avatar, Axis, Button} from 'tinywidgets';
import {useHasValues, useValue} from 'tinybase/ui-react';
import {LogOut} from 'lucide-react';
import React from 'react';
import {SiGithub} from '@icons-pack/react-simple-icons';

const login = () => location.assign('auth.html');
const logout = () => location.assign('auth.html?logout');

export const Auth = () => {
  const hasUser = useHasValues(USER_STORE);
  const name = useValue(NAME_VALUE, USER_STORE) as string;
  const avatarUrl = useValue(AVATAR_URL_VALUE, USER_STORE) as string;

  return hasUser ? (
    <Axis>
      {name && avatarUrl ? <Avatar src={avatarUrl} title={name} /> : null}
      <Button onClick={logout} icon={LogOut} label="Logout" />
    </Axis>
  ) : (
    <Button onClick={login} icon={SiGithub} label="Login" variant="accent" />
  );
};
