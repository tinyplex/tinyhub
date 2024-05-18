import {AUTO, DARK, DARK_MODE, LIGHT, UI_STORE} from '../stores/UiStore';
import React, {useEffect, useState} from 'react';
import {Header} from './header/Header';
import {Main} from './Main';
import {StoreInspector} from 'tinybase/debug/ui-react-dom';
import {useValue} from 'tinybase/debug/ui-react';

const PREFERS_DARK = matchMedia('(prefers-color-scheme: dark)');

export const Ui = () => {
  const darkMode = useValue(DARK_MODE, UI_STORE) ?? AUTO;
  const [prefersDark, setPrefersDark] = useState<boolean>(PREFERS_DARK.matches);

  useEffect(() => {
    const preferenceListener = () => setPrefersDark(PREFERS_DARK.matches);
    PREFERS_DARK.addEventListener('change', preferenceListener);
    return () => PREFERS_DARK.removeEventListener('change', preferenceListener);
  }, [setPrefersDark]);

  return (
    <div
      id="ui"
      className={
        darkMode == DARK || (darkMode == AUTO && prefersDark) ? DARK : LIGHT
      }
    >
      <Header />
      <Main />
      <StoreInspector />
    </div>
  );
};
