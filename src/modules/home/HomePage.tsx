import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CheckSquare, Users, User, BookOpen, Camera } from 'lucide-react';
import styles from './HomePage.module.css';

const MODULES = [
  { to: '/app/tareas',  Icon: CheckSquare, label: 'Rutina del día', desc: 'Las actividades de hoy'   },
  { to: '/app/diario',  Icon: BookOpen,    label: 'Diario',          desc: 'Notas y momentos'         },
  { to: '/app/fotos',   Icon: Camera,      label: 'Fotos',           desc: 'Recuerdos con imagen'     },
  { to: '/app/hijos',   Icon: Users,       label: 'Mis hijos',       desc: 'Perfiles y línea de tiempo' },
  { to: '/app/perfil',  Icon: User,        label: 'Mi perfil',       desc: 'Tu cuenta y colores'      },
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
        <span className={styles.eyebrow}>Aquelentonces</span>
        <h1 className={styles.greeting}>
          {getGreeting()}{firstName ? `, ${firstName}` : ''}
        </h1>
        <p className={styles.subgreeting}>¿Qué quieres registrar hoy?</p>
      </div>

      <div className={styles.grid}>
        {MODULES.map(({ to, Icon, label, desc }) => (
          <Link key={to} to={to} className={styles.moduleCard}>
            <div className={styles.moduleIconWrap}>
              <Icon size={26} strokeWidth={2} className={styles.moduleIcon} />
            </div>
            <p className={styles.moduleLabel}>{label}</p>
            <p className={styles.moduleDesc}>{desc}</p>
          </Link>
        ))}
      </div>

      <div className={styles.recentSection}>
        <span className={styles.sectionLabel}>Para empezar</span>
        <div className={styles.hint}>
          <strong>Comienza por la rutina.</strong> Registra las actividades del día y asígnalas a días de la semana. Con el tiempo, cada tarea completada se convierte en un recuerdo de lo que vivió tu familia.
        </div>
      </div>
    </main>
  );
}
