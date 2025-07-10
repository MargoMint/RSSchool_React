import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Header from './components/Header.tsx';
import Main from './components/Main.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <Header />
      <Main />
    </ErrorBoundary>
  </StrictMode>
);
