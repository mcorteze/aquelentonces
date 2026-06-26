import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CheckSquare, Users, User } from 'lucide-react';
import styles from './HomePage.module.css';

const MODULES = [
  { to: '/app/tareas', Icon: CheckSquare, label: 'Tareas del día',  desc: 'Las actividades de hoy' },
  { to: '/app/hijos',  Icon: Users,       label: 'Mis hijos',       desc: 'Gestiona los perfiles'  },
  { to: '/app/perfil', Icon: User,        label: 'Mi perfil',       desc: 'Tu cuenta y colores'    },
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
          {getGreeting()}{firstName ? `, ${firstName}` : ''}
        </h1>
        <p className={styles.subgreeting}>¿Qué quieres hacer hoy?</p>
      </div>

      <div className={styles.grid}>
        {MODULES.map(({ to, Icon, label, desc }) => (
          <Link key={to} to={to} className={styles.moduleCard}>
            <Icon size={36} strokeWidth={1.75} className={styles.moduleIcon} />
            <p className={styles.moduleLabel}>{label}</p>
            <p className={styles.moduleDesc}>{desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
