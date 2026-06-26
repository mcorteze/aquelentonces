import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChildren } from './hooks/useChildren';
import styles from './ChildrenListPage.module.css';

function calcAge(birthDate: string): string {
  const birth = new Date(birthDate);
  const now = new Date();
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (months < 12) return `${months} ${months === 1 ? 'mes' : 'meses'}`;
  const years = Math.floor(months / 12);
  return `${years} ${years === 1 ? 'año' : 'años'}`;
}

export function ChildrenListPage() {
  const navigate = useNavigate();
  const { children, loading, error, reload, remove } = useChildren();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirmId !== id) {
      setConfirmId(id);
      setTimeout(() => setConfirmId(null), 4000);
      return;
    }
    setDeletingId(id);
    setConfirmId(null);
    try {
      await remove(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mis hijos e hijas</h1>
        <button className={styles.addBtn} onClick={() => navigate('/app/hijos/nuevo')}>
          + Agregar
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          <span className={styles.errorText}>{error}</span>
          <button className={styles.retryBtn} onClick={reload}>Reintentar</button>
        </div>
      )}

      {loading ? (
        <ul className={styles.list}>
          {[1, 2].map(i => <li key={i} className={styles.skeleton} aria-hidden="true" />)}
        </ul>
      ) : children.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>👨‍👩‍👧</div>
          <p className={styles.emptyTitle}>Aún no agregaste hijos</p>
          <p className={styles.emptyText}>
            Agrega a tus hijos e hijas para organizar<br />sus actividades desde la app.
          </p>
          <button className={styles.addBtn} onClick={() => navigate('/app/hijos/nuevo')}>
            + Agregar el primero
          </button>
        </div>
      ) : (
        <ul className={styles.list}>
          {children.map(child => (
            <li key={child.id} className={styles.childCard}>
              <span className={styles.childEmoji} aria-hidden="true">{child.avatarEmoji}</span>
              <div className={styles.childInfo}>
                <p className={styles.childName}>{child.name}</p>
                <p className={styles.childAge}>{calcAge(child.birthDate)}</p>
              </div>
              <div className={styles.childActions}>
                <button
                  className={styles.editBtn}
                  onClick={() => navigate(`/app/hijos/${child.id}/editar`)}
                  aria-label={`Editar ${child.name}`}
                >
                  Editar
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(child.id)}
                  disabled={deletingId === child.id}
                  aria-label={confirmId === child.id ? `Confirmar eliminar a ${child.name}` : `Eliminar a ${child.name}`}
                >
                  {deletingId === child.id ? '...' : confirmId === child.id ? '¿Eliminar?' : '✕'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
