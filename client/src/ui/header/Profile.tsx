import {AVATAR_URL_VALUE, NAME_VALUE, USER_STORE} from '../../stores/UserStore';
import React from 'react';
import {useValue} from 'tinybase/debug/ui-react';

export const Profile = () => {
  const name = useValue(NAME_VALUE, USER_STORE) as string;
  const avatarUrl = useValue(AVATAR_URL_VALUE, USER_STORE) as string;
  return name && avatarUrl ? (
    <img className="avatar" src={avatarUrl} title={name} />
  ) : null;
};
