import {
  AVATAR_URL_VALUE,
  NAME_VALUE,
  USER_STORE,
} from '../../../stores/UserStore';
import {Avatar, Button, Row} from 'tinywidgets';
import {useHasValues, useValue} from 'tinybase/ui-react';
import React from 'react';

const login = () => location.assign('auth.html');
const logout = () => location.assign('auth.html?logout');

export const Auth = () => {
  const hasUser = useHasValues(USER_STORE);
  const name = useValue(NAME_VALUE, USER_STORE) as string;
  const avatarUrl = useValue(AVATAR_URL_VALUE, USER_STORE) as string;

  return (
    <div id="auth">
      {hasUser ? (
        <Row>
          <Button onClick={logout} label="Logout" />
          {name && avatarUrl ? <Avatar src={avatarUrl} title={name} /> : null}
        </Row>
      ) : (
        <Button onClick={login} label="Login" variant="accent" />
      )}
    </div>
  );
};
