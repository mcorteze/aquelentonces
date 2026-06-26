import type { ReactNode } from 'react';
import styles from './AuthLayout.module.css';

export function AuthLayout({ children }: { children: ReactNode }) {
  return <div className={styles.layout}>{children}</div>;
}
