import { useState } from 'react';
import { Plus, Check, Pencil, Trash2, Settings2, CalendarDays, Sparkles } from 'lucide-react';
import { useTodayTasks } from './hooks/useTodayTasks';
import { useTaskTemplates } from './hooks/useTaskTemplates';
import { TaskForm } from './components/TaskForm';
import { CATEGORY_IMAGE } from './categoryImages';
import type { TaskTemplate, DayOfWeek } from './types';
import styles from './DailyTasksPage.module.css';

const DAY_LABELS: Record<number, string> = {
  0: 'Dom', 1: 'Lun', 2: 'Mar', 3: 'Mié', 4: 'Jue', 5: 'Vie', 6: 'Sáb',
};

const now        = new Date();
const TODAY_NAME = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'][now.getDay()];
const TODAY_DATE = now.toLocaleDateString('es-CL', { day: 'numeric', month: 'long' });

type Tab = 'hoy' | 'rutina';

export function DailyTasksPage() {
  const [tab, setTab]           = useState<Tab>('hoy');
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<TaskTemplate | null>(null);

  const today  = useTodayTasks();
  const manage = useTaskTemplates();

  const done  = today.tasks.filter((t) => t.status === 'done').length;
  const total = today.tasks.length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
  const allDone = total > 0 && done === total;

  const openCreate = () => { setEditTarget(null); setShowForm(true); };
  const openEdit   = (t: TaskTemplate) => { setEditTarget(t); setShowForm(true); };
  const closeForm  = () => { setShowForm(false); setEditTarget(null); };

  const handleSave = async (data: Omit<TaskTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editTarget) {
      await manage.update(editTarget.id, data);
    } else {
      await manage.create(data);
    }
    today.reload();
  };

  const handleDelete = async (id: string) => {
    await manage.remove(id);
    today.reload();
  };

  const countVariations = (t: TaskTemplate) =>
    Object.values(t.variations).filter((v) => v.trim().length > 0).length;

  return (
    <main className={styles.page}>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'hoy' ? styles.tabActive : ''}`}
          onClick={() => setTab('hoy')}
        >
          Hoy
        </button>
        <button
          className={`${styles.tab} ${tab === 'rutina' ? styles.tabActive : ''}`}
          onClick={() => setTab('rutina')}
        >
          Mi rutina
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          VISTA HOY — grilla de cards visuales
          ══════════════════════════════════════════════════════════════ */}
      {tab === 'hoy' && (
        <>
          <div className={styles.sectionHeader}>
            <h1 className={styles.sectionTitle}>
              {TODAY_NAME}
              <span className={styles.sectionMeta}>{TODAY_DATE}</span>
            </h1>
            <button className={styles.editBtn} onClick={() => setTab('rutina')}>
              <Settings2 size={14} />
              Editar rutina
            </button>
          </div>

          {today.error && (
            <div className={styles.error}>
              <span className={styles.errorText}>{today.error}</span>
              <button className={styles.retryBtn} onClick={today.reload}>Reintentar</button>
            </div>
          )}

          {/* Skeleton de carga */}
          {today.loading && (
            <div className={styles.skeletonGrid}>
              {[1,2,3,4].map((i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonCardImg} />
                  <div className={styles.skeletonCardBody} />
                </div>
              ))}
            </div>
          )}

          {/* Sin tareas para hoy */}
          {!today.loading && total === 0 && !today.error && (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                <CalendarDays size={60} strokeWidth={1.1} />
              </div>
              <p className={styles.emptyTitle}>Sin actividades hoy</p>
              <p className={styles.emptyText}>
                Crea la rutina de tu familia y asigna actividades a cada día de la semana.
              </p>
              <button className={styles.emptyBtn} onClick={() => setTab('rutina')}>
                <Plus size={18} />
                Crear mi rutina
              </button>
            </div>
          )}

          {/* Progress */}
          {!today.loading && total > 0 && (
            <div className={styles.progressWrap}>
              <div className={styles.progressRow}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                </div>
                <span className={styles.progressLabel}>{pct}%</span>
              </div>
              <span className={styles.progressDone}>
                {done} de {total} {done === 1 ? 'actividad completada' : 'actividades completadas'}
              </span>
            </div>
          )}

          {/* Grilla de cards */}
          {!today.loading && total > 0 && (
            <>
              <div className={styles.taskGrid}>
                {today.tasks.map((task) => {
                  const isDone = task.status === 'done';
                  const imgSrc = CATEGORY_IMAGE[task.category];
                  return (
                    <div
                      key={task.templateId}
                      className={`${styles.taskCard} ${isDone ? styles.taskCardDone : ''}`}
                      onClick={() => today.toggle(task.templateId)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && today.toggle(task.templateId)}
                      aria-pressed={isDone}
                      aria-label={`${isDone ? 'Desmarcar' : 'Completar'}: ${task.title}`}
                    >
                      {/* Imagen */}
                      <div className={styles.taskImageWrap}>
                        <img
                          src={imgSrc}
                          alt=""
                          className={styles.taskImage}
                          draggable={false}
                          loading="lazy"
                        />
                        {/* Overlay con check al completar */}
                        <div className={styles.taskImageOverlay} aria-hidden="true">
                          <div className={styles.taskImageCheck}>
                            <Check size={32} strokeWidth={3} color="#1A1A1A" />
                          </div>
                        </div>
                      </div>

                      {/* Nombre + check táctil */}
                      <div className={styles.taskCardBody}>
                        <div className={styles.taskCardText}>
                          <p className={styles.taskCardTitle}>{task.title}</p>
                          {task.variationText && (
                            <p className={styles.taskCardVariation}>{task.variationText}</p>
                          )}
                        </div>
                        <div
                          className={`${styles.taskCardCheck} ${isDone ? styles.taskCardCheckDone : ''}`}
                          aria-hidden="true"
                        >
                          {isDone && <Check size={16} strokeWidth={3} />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Banner "¡Todo listo!" */}
              {allDone && (
                <div className={styles.allDoneBanner}>
                  <Sparkles size={28} color="#417178" />
                  <div className={styles.allDoneText}>
                    <p className={styles.allDoneTitle}>¡Día completado!</p>
                    <p className={styles.allDoneSub}>Todas las actividades de hoy están listas.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════
          VISTA MI RUTINA — lista de templates con miniatura
          ══════════════════════════════════════════════════════════════ */}
      {tab === 'rutina' && (
        <>
          <div className={styles.sectionHeader}>
            <h1 className={styles.sectionTitle}>
              Mi rutina
              {manage.templates.length > 0 && (
                <span className={styles.sectionMeta}>
                  {manage.templates.length} {manage.templates.length === 1 ? 'actividad' : 'actividades'}
                </span>
              )}
            </h1>
            <button className={styles.addBtn} onClick={openCreate}>
              <Plus size={16} />
              Nueva actividad
            </button>
          </div>

          {manage.error && (
            <div className={styles.error}>
              <span className={styles.errorText}>{manage.error}</span>
              <button className={styles.retryBtn} onClick={manage.reload}>Reintentar</button>
            </div>
          )}

          {manage.loading && (
            <div className={styles.templateList}>
              {[1,2,3].map((i) => (
                <div key={i} className={styles.skeletonCard} style={{ height: 80, borderRadius: 16 }} />
              ))}
            </div>
          )}

          {!manage.loading && manage.templates.length === 0 && !manage.error && (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                <CalendarDays size={60} strokeWidth={1.1} />
              </div>
              <p className={styles.emptyTitle}>Sin actividades aún</p>
              <p className={styles.emptyText}>
                Añade las actividades que hace tu familia y asígnalas a los días de la semana que correspondan.
              </p>
              <button className={styles.emptyBtn} onClick={openCreate}>
                <Plus size={18} />
                Crear actividad
              </button>
            </div>
          )}

          {!manage.loading && manage.templates.length > 0 && (
            <div className={styles.templateList}>
              {manage.templates.map((t) => {
                const varCount = countVariations(t);
                return (
                  <div key={t.id} className={styles.templateItem}>
                    <img
                      src={CATEGORY_IMAGE[t.category]}
                      alt=""
                      className={styles.templateThumb}
                      loading="lazy"
                    />
                    <div className={styles.templateMain}>
                      <p className={styles.templateTitle}>{t.title}</p>
                      <div className={styles.templateDays}>
                        {(t.days as DayOfWeek[])
                          .sort((a, b) => (a === 0 ? 7 : a) - (b === 0 ? 7 : b))
                          .map((d) => (
                            <span key={d} className={styles.templateDayChip}>
                              {DAY_LABELS[d]}
                            </span>
                          ))}
                      </div>
                      {varCount > 0 && (
                        <p className={styles.templateVariationNote}>
                          {varCount} variación{varCount > 1 ? 'es' : ''} por día
                        </p>
                      )}
                    </div>
                    <div className={styles.templateActions}>
                      <button
                        className={styles.iconBtn}
                        onClick={() => openEdit(t)}
                        aria-label="Editar actividad"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                        onClick={() => handleDelete(t.id)}
                        aria-label="Eliminar actividad"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Form crear / editar */}
      {showForm && (
        <TaskForm
          initial={editTarget ?? undefined}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}
    </main>
  );
}
