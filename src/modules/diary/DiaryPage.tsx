import { useDiary } from './hooks/useDiary';
import { ENTRY_TYPE_META, MOOD_META } from './types';
import type { DiaryEntry } from './types';
import type { Child } from '../../types';
import styles from './DiaryPage.module.css';

const MONTHS = [
  'enero','febrero','marzo','abril','mayo','junio',
  'julio','agosto','septiembre','octubre','noviembre','diciembre',
];
const DAYS_ES = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const dow  = DAYS_ES[date.getDay()];
  return `${dow} ${d} de ${MONTHS[m - 1]}`;
}

function isToday(dateStr: string): boolean {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return dateStr === today;
}

interface EntryCardProps {
  entry: DiaryEntry;
  childMap: Map<string, Child>;
}

function EntryCard({ entry, childMap }: EntryCardProps) {
  const meta  = ENTRY_TYPE_META[entry.type];
  const child = entry.childId ? childMap.get(entry.childId) : null;

  // Color de la franja — crema usa petróleo para ser visible
  const accentColor = meta.color === '#FAF6ED' ? '#417178' : meta.color;

  return (
    <article className={styles.entryCard}>
      <div className={styles.entryAccent} style={{ background: accentColor }} aria-hidden="true" />

      <div className={styles.entryMeta}>
        <span className={styles.entryType} style={{ color: accentColor }}>
          {meta.label}
        </span>
        <div className={styles.entryRight}>
          {child && (
            <span className={styles.entryChild}>
              <span aria-hidden="true">{child.avatarEmoji}</span>
              {child.name}
            </span>
          )}
          {entry.mood && (
            <span className={styles.entryMood} title={MOOD_META[entry.mood].label} aria-label={MOOD_META[entry.mood].label}>
              {MOOD_META[entry.mood].symbol}
            </span>
          )}
        </div>
      </div>

      <p className={styles.entryBody}>{entry.body}</p>
    </article>
  );
}

interface Props {
  children: Child[];
  onEntryCreated?: () => void;
}

export function DiaryPage({ children }: Props) {
  const { days, loading, error, reload } = useDiary();

  const childMap = new Map(children.map((c) => [c.id, c]));

  const totalEntries = days.reduce((acc, d) => acc + d.entries.length, 0);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Aquelentonces</span>
        <h1 className={styles.title}>Diario</h1>
        {!loading && totalEntries > 0 && (
          <p className={styles.subtitle}>
            {totalEntries} {totalEntries === 1 ? 'recuerdo guardado' : 'recuerdos guardados'}
          </p>
        )}
        {!loading && totalEntries === 0 && (
          <p className={styles.subtitle}>
            Escribe el primer recuerdo con el botón&nbsp;+
          </p>
        )}
      </header>

      {error && (
        <div className={styles.error}>
          <span className={styles.errorText}>{error}</span>
          <button className={styles.retryBtn} onClick={reload}>Reintentar</button>
        </div>
      )}

      {/* Skeleton */}
      {loading && (
        <div className={styles.skeletonGroup}>
          {[140, 100, 170].map((h, i) => (
            <div key={i} className={styles.skeletonDay}>
              <div className={styles.skeletonLabel} />
              <div className={styles.skeletonCard} style={{ height: h }} />
            </div>
          ))}
        </div>
      )}

      {/* Estado vacío */}
      {!loading && days.length === 0 && !error && (
        <div className={styles.empty}>
          <span className={styles.emptyIcon} aria-hidden="true">◌</span>
          <p className={styles.emptyTitle}>El diario está esperando</p>
          <p className={styles.emptyText}>
            Cada cosa que escribas aquí se convierte en algo que no olvidarás.
            Empieza con lo que pasó hoy.
          </p>
        </div>
      )}

      {/* Línea de tiempo */}
      {!loading && days.length > 0 && (
        <div className={styles.timeline}>
          {days.map((day) => (
            <section key={day.date} className={styles.dayGroup}>
              <div className={styles.dayHeader}>
                <h2 className={styles.dayDate}>
                  {isToday(day.date) ? 'Hoy' : formatDate(day.date)}
                </h2>
                {day.entries.length > 1 && (
                  <span className={styles.dayCount}>
                    {day.entries.length} entradas
                  </span>
                )}
                <div className={styles.dayLine} aria-hidden="true" />
              </div>
              <div className={styles.entries}>
                {day.entries.map((entry) => (
                  <EntryCard key={entry.id} entry={entry} childMap={childMap} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
