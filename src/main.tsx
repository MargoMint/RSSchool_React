import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Header from './components/Header.tsx';
import Main from './components/Main.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Header />
    <Main />
  </StrictMode>
);
