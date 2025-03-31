import {createRoot} from 'react-dom/client';
import {App} from './App';

addEventListener('load', () =>
  createRoot(document.getElementById('app')!).render(<App />),
);
