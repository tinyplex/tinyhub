import {AUTO, DARK, DARK_MODE_VALUE, LIGHT, UI_STORE} from '../stores/UiStore';
import React, {useEffect, useState} from 'react';
import {Header} from './header/Header';
import {Inspector} from 'tinybase/ui-react-inspector';
import {Main} from './Main';
import {useValue} from 'tinybase/ui-react';

const PREFERS_DARK = matchMedia('(prefers-color-scheme: dark)');

export const Ui = () => {
  const darkMode = useValue(DARK_MODE_VALUE, UI_STORE) ?? AUTO;
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
      <Inspector />
    </div>
  );
};
