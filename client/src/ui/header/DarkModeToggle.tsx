import React from 'react';
import {useModeToggleMode} from '../DarkMode';

export const DarkModeToggle = () => {
  const [mode, toggleMode] = useModeToggleMode();

  return <span id="darkModeToggle" onClick={toggleMode} className={mode} />;
};
