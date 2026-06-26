import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './HomePage.module.css';

const MODULES = [
  { to: '/app/tareas',  icon: '✅', label: 'Tareas del día',  desc: 'Las actividades de hoy' },
  { to: '/app/hijos',   icon: '👨‍👩‍👧', label: 'Mis hijos',      desc: 'Gestiona los perfiles' },
  { to: '/app/perfil',  icon: '👤', label: 'Mi perfil',       desc: 'Tu cuenta y colores' },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

export function HomePage() {
  const { user } = useAuth();
  const firstName = user?.displayName?.split(' ')[0] ?? '';

  return (
    <main className={styles.page}>
      <div className={styles.welcome}>
        <h1 className={styles.greeting}>
          {getGreeting()}{firstName ? `, ${firstName}` : ''} ⭐
        </h1>
        <p className={styles.subgreeting}>¿Qué quieres hacer hoy?</p>
      </div>

      <div className={styles.grid}>
        {MODULES.map(m => (
          <Link key={m.to} to={m.to} className={styles.moduleCard}>
            <span className={styles.moduleIcon} aria-hidden="true">{m.icon}</span>
            <p className={styles.moduleLabel}>{m.label}</p>
            <p className={styles.moduleDesc}>{m.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
