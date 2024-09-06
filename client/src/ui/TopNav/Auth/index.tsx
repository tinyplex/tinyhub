/** @jsx createElement */

import {Avatar, Axis, Button} from 'tinywidgets';
import {createElement} from '../../../common';
import {useUserValue} from '../../../stores/UserStore';

const login = () => location.assign('auth.html');
const logout = () => location.assign('auth.html?logout');

export const Auth = () => {
  const name = useUserValue('name');
  const avatarUrl = useUserValue('avatarUrl');

  return name ? (
    <Axis>
      <Button onClick={logout} label="Logout" />
      {name && avatarUrl ? <Avatar src={avatarUrl} title={name} /> : null}
    </Axis>
  ) : (
    <Button onClick={login} label="Login" variant="accent" />
  );
};
