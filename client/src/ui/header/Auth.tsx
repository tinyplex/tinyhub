import {Profile} from './Profile';
import React from 'react';
import {USER_STORE} from '../../stores/UserStore';
import {useHasValues} from 'tinybase/debug/ui-react';

const handleLogin = () => location.assign('auth.html');
const handleLogout = () => location.assign('auth.html?logout');

export const Auth = () => {
  const hasUser = useHasValues(USER_STORE);

  return (
    <div id="auth">
      {hasUser ? (
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
