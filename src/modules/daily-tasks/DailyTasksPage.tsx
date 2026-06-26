import { useDailyTasks } from './hooks/useDailyTasks';
import { TaskList } from './components/TaskList';
import styles from './DailyTasksPage.module.css';

export function DailyTasksPage() {
  const { tasks, loading, error, toggle, reload } = useDailyTasks();

  const done = tasks.filter((t) => t.status === 'done').length;
  const total = tasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Mis tareas de hoy ⭐</h1>
        <p className={styles.subtitle}>
          {loading ? 'Cargando...' : total > 0 ? `${done} de ${total} completadas` : ''}
        </p>
      </header>

      {!loading && total > 0 && (
        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
          <span className={styles.progressLabel}>{pct}%</span>
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <span className={styles.errorText}>{error}</span>
          <button className={styles.retryBtn} onClick={reload}>
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && total === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🌙</div>
          <p className={styles.emptyText}>No hay tareas para hoy</p>
        </div>
      ) : (
        <TaskList tasks={tasks} loading={loading} onToggle={toggle} />
      )}
    </main>
  );
}
