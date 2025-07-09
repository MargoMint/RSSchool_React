import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Main from './components/Main.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
