import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './theme/global.css';
import { FirebaseAuthProvider } from './app/providers';
import { AppRouter } from './app/Router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirebaseAuthProvider>
      <AppRouter />
    </FirebaseAuthProvider>
  </StrictMode>
);
