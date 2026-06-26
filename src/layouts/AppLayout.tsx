import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './AppLayout.module.css';

const NAV_ITEMS = [
  { to: '/app/inicio',  label: 'Inicio',         icon: '🏠' },
  { to: '/app/hijos',   label: 'Mis hijos',       icon: '👨‍👩‍👧' },
  { to: '/app/tareas',  label: 'Tareas del día',  icon: '✅' },
  { to: '/app/perfil',  label: 'Mi perfil',       icon: '👤' },
];

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {NAV_ITEMS.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
          }
          onClick={onNavigate}
        >
          <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </>
  );
}

export function AppLayout() {
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className={styles.shell}>
      {/* ── Sidebar — visible en tablet/desktop ── */}
      <aside className={styles.sidebar} aria-label="Navegación principal">
        <div className={styles.sidebarLogo}>
          <span className={styles.logoMark} aria-hidden="true">⭐</span>
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
              <div className={styles.avatarPlaceholder} aria-hidden="true">👤</div>
            )}
            <span className={styles.avatarName}>
              {user?.displayName ?? user?.email ?? 'Mi perfil'}
            </span>
          </NavLink>
        </div>
      </aside>

      {/* ── Topbar — visible en móvil ── */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <button
            className={styles.menuBtn}
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={drawerOpen}
          >
            ☰
          </button>
          <span className={styles.topbarLogo}>⭐ Aquelentonces</span>
          <NavLink to="/app/perfil" aria-label="Mi perfil">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName ?? 'Tu perfil'}
                className={styles.avatar}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className={styles.avatarPlaceholder} aria-hidden="true">👤</div>
            )}
          </NavLink>
        </header>

        <Outlet />
      </div>

      {/* ── Drawer móvil ── */}
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
          ✕
        </button>
        <div className={styles.sidebarLogo} style={{ marginTop: 12 }}>
          <span className={styles.logoMark} aria-hidden="true">⭐</span>
          <span className={styles.logoText}>Aquelentonces</span>
        </div>
        <div className={styles.sidebarNav}>
          <NavItems onNavigate={closeDrawer} />
        </div>
      </nav>
    </div>
  );
}
