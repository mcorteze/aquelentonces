import type { ReactNode } from 'react';
import { signOut } from '../services/firebase/auth';
import { useAuth } from '../hooks/useAuth';
import styles from './AppLayout.module.css';

export function AppLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <div className={styles.layout}>
      <header className={styles.topbar}>
        <span className={styles.logo}>★ Sofía</span>
        <div className={styles.user}>
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName ?? 'Usuario'}
              className={styles.avatar}
              referrerPolicy="no-referrer"
            />
          )}
          <button className={styles.logoutBtn} onClick={signOut}>
            Salir
          </button>
        </div>
      </header>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
