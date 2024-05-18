import {Auth} from './Auth';
import {DarkModeToggle} from './DarkModeToggle';
import {Logo} from './Logo';
import React from 'react';

export const Header = () => (
  <header id="header">
    <Logo />
    <DarkModeToggle />
    <Auth />
  </header>
);
