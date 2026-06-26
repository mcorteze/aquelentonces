import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useChildren } from '../modules/children/hooks/useChildren';
import { useDiary } from '../modules/diary/hooks/useDiary';
import { DiaryFAB } from '../components/diary/DiaryFAB';
import { Home, Users, CheckSquare, User, BookOpen, Menu, X } from 'lucide-react';
import styles from './AppLayout.module.css';

const NAV_ITEMS = [
  { to: '/app/inicio',  label: 'Inicio',        Icon: Home        },
  { to: '/app/diario',  label: 'Diario',         Icon: BookOpen    },
  { to: '/app/tareas',  label: 'Rutina',         Icon: CheckSquare },
  { to: '/app/hijos',   label: 'Mis hijos',      Icon: Users       },
  { to: '/app/perfil',  label: 'Mi perfil',      Icon: User        },
];

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {NAV_ITEMS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
          }
          onClick={onNavigate}
        >
          <Icon size={20} className={styles.navIcon} strokeWidth={2} />
          {label}
        </NavLink>
      ))}
    </>
  );
}

export function AppLayout() {
  const { user }                    = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer                 = () => setDrawerOpen(false);
  const navigate                    = useNavigate();

  // Carga hijos una vez — se pasa al FAB para saber a quién asignar entradas
  const { children } = useChildren();

  // reload del diario — se pasa al FAB para refrescar la línea de tiempo tras guardar
  const { reload: reloadDiary } = useDiary();

  const handleFABSaved = () => {
    reloadDiary();
    navigate('/app/diario');
  };

  return (
    <div className={styles.shell}>
      {/* Sidebar — tablet/desktop */}
      <aside className={styles.sidebar} aria-label="Navegación principal">
        <div className={styles.sidebarLogo}>
          <span className={styles.logoText}>Aquelentonces</span>
        </div>
        <nav className={styles.sidebarNav}>
          <NavItems />
        </nav>
        <div className={styles.sidebarFooter}>
          <NavLink to="/app/perfil" className={styles.avatarRow}>
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName ?? 'Tu perfil'}
                className={styles.avatar}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className={styles.avatarPlaceholder} aria-hidden="true">
                <User size={20} />
              </div>
            )}
            <span className={styles.avatarName}>
              {user?.displayName ?? user?.email ?? 'Mi perfil'}
            </span>
          </NavLink>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <button
            className={styles.menuBtn}
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={drawerOpen}
          >
            <Menu size={24} />
          </button>
          <span className={styles.topbarLogo}>Aquelentonces</span>
          <NavLink to="/app/perfil" aria-label="Mi perfil">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName ?? 'Tu perfil'}
                className={styles.avatar}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className={styles.avatarPlaceholder} aria-hidden="true">
                <User size={18} />
              </div>
            )}
          </NavLink>
        </header>

        <Outlet />
      </div>

      {/* FAB global — accesible desde cualquier pantalla */}
      <DiaryFAB children={children} onSaved={handleFABSaved} />

      {/* Overlay + Drawer móvil */}
      <div
        className={`${styles.overlay} ${drawerOpen ? styles.overlayVisible : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <nav
        className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}
        aria-label="Menú móvil"
        aria-hidden={!drawerOpen}
      >
        <button className={styles.drawerClose} onClick={closeDrawer} aria-label="Cerrar menú">
          <X size={20} />
        </button>
        <div className={styles.sidebarLogo} style={{ marginTop: 12 }}>
          <span className={styles.logoText}>Aquelentonces</span>
        </div>
        <div className={styles.sidebarNav}>
          <NavItems onNavigate={closeDrawer} />
        </div>
      </nav>
    </div>
  );
}
