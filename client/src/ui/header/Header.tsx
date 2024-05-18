import {Auth} from './Auth';
import {DarkMode} from './DarkMode';
import {Logo} from './Logo';
import React from 'react';

export const Header = () => (
  <header id="header">
    <Logo />
    <DarkMode />
    <Auth />
  </header>
);
