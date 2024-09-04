/** @jsx createElement */

import './index.css.ts';
import {App} from './App';
import {createElement} from './ui/common.ts';
import {createRoot} from 'react-dom/client';

addEventListener('load', () =>
  createRoot(document.getElementById('app')!).render(<App />),
);
