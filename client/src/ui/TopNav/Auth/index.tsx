/** @jsx createElement */

import {
  AVATAR_URL_VALUE,
  NAME_VALUE,
  USER_STORE,
} from '../../../stores/UserStore';
import {Avatar, Axis, Button} from 'tinywidgets';
import {useHasValues, useValue} from 'tinybase/ui-react';
import {createElement} from '../../../common';

const login = () => location.assign('auth.html');
const logout = () => location.assign('auth.html?logout');

export const Auth = () => {
  const hasUser = useHasValues(USER_STORE);
  const name = useValue(NAME_VALUE, USER_STORE) as string;
  const avatarUrl = useValue(AVATAR_URL_VALUE, USER_STORE) as string;

  return (
    <div id="auth">
      {hasUser ? (
        <Axis>
          <Button onClick={logout} label="Logout" />
          {name && avatarUrl ? <Avatar src={avatarUrl} title={name} /> : null}
        </Axis>
      ) : (
        <Button onClick={login} label="Login" variant="accent" />
      )}
    </div>
  );
};
