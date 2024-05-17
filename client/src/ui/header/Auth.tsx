import {
  AVATAR_URL_VALUE,
  HAS_TOKEN_VALUE,
  NAME_VALUE,
  USER_STORE,
} from '../../stores/UserStore';
import React from 'react';
import {useValue} from 'tinybase/debug/ui-react';

const handleLogin = () => location.assign('auth.html');
const handleLogout = () => location.assign('auth.html?logout');

export const Auth = () => {
  const hasToken = useValue(HAS_TOKEN_VALUE, USER_STORE);

  return (
    <div id="auth">
      {hasToken ? (
        <>
          <Profile />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

const Profile = () => {
  const name = useValue(NAME_VALUE, USER_STORE) as string;
  const avatarUrl = useValue(AVATAR_URL_VALUE, USER_STORE) as string;
  return name && avatarUrl ? (
    <img className="avatar" src={avatarUrl} title={name} />
  ) : null;
};
