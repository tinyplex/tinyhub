import {App} from './ui/App';
import React from 'react';
import {createRoot} from 'react-dom/client';

addEventListener('load', () =>
  createRoot(document.getElementById('root')!).render(<App />),
);
