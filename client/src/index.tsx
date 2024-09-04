import './index.css.ts';
import {App} from './App';
import React from 'react';
import {createRoot} from 'react-dom/client';

addEventListener('load', () =>
  createRoot(document.getElementById('app')!).render(<App />),
);
