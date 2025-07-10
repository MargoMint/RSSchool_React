import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Main from './components/Main.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  </StrictMode>
);
