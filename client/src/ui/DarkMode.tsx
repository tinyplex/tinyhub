import React, {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Mode = 'auto' | 'dark' | 'light';
type ModeToggleMode = [Mode, () => void];

const DARK_MODE = 'darkMode';
const AUTO = 'auto';
const DARK = 'dark';
const LIGHT = 'light';
const STORAGE = 'storage';
const PREFERS_QUERY = matchMedia('(prefers-color-scheme: dark)');

const Context = createContext<ModeToggleMode>([AUTO, () => {}]);

export const useModeToggleMode = (): ModeToggleMode => useContext(Context);

export const DarkMode = ({children}: {readonly children: ReactNode}) => {
  const [mode, setMode] = useState<Mode>(
    (localStorage.getItem(DARK_MODE) ?? AUTO) as Mode,
  );
  const [prefersDark, setPrefersDark] = useState<boolean>(
    PREFERS_QUERY.matches,
  );

  useEffect(() => {
    const storageListener = (event: StorageEvent) => {
      if (event.storageArea == localStorage && event.key == DARK_MODE) {
        setMode((event.newValue ?? AUTO) as Mode);
      }
    };
    const preferenceListener = () => setPrefersDark(PREFERS_QUERY.matches);

    addEventListener(STORAGE, storageListener);
    PREFERS_QUERY.addEventListener('change', preferenceListener);

    return () => {
      removeEventListener(STORAGE, storageListener);
      PREFERS_QUERY.removeEventListener('change', preferenceListener);
    };
  }, [setMode]);

  const modeToggleMode: ModeToggleMode = useMemo(
    () => [
      mode,
      () => {
        const newMode = mode == AUTO ? DARK : mode == DARK ? LIGHT : AUTO;
        setMode(newMode);
        localStorage.setItem(DARK_MODE, newMode);
      },
    ],
    [mode, setMode],
  );

  return (
    <div
      id={DARK_MODE}
      className={mode == DARK || (mode == AUTO && prefersDark) ? DARK : LIGHT}
    >
      <Context.Provider value={modeToggleMode}>{children}</Context.Provider>
    </div>
  );
};
