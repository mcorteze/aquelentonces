import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useChildren } from './hooks/useChildren';
import { fetchEntriesByChild } from '../diary/services/diaryService';
import { useAuth } from '../../hooks/useAuth';
import { ENTRY_TYPE_META, MOOD_META } from '../diary/types';
import type { DiaryEntry, DiaryDay } from '../diary/types';
import type { Child } from '../../types';
import styles from './ChildProfilePage.module.css';

const MONTHS = [
  'enero','febrero','marzo','abril','mayo','junio',
  'julio','agosto','septiembre','octubre','noviembre','diciembre',
];
const DAYS_ES = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const dow  = DAYS_ES[date.getDay()];
  return `${dow} ${d} de ${MONTHS[m - 1]} de ${y}`;
}

function calcAge(birthDate: string): string {
  const birth = new Date(birthDate);
  const now   = new Date();
  const totalMonths =
    (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (totalMonths < 12) return `${totalMonths} ${totalMonths === 1 ? 'mes' : 'meses'}`;
  const years  = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (months === 0) return `${years} ${years === 1 ? 'año' : 'años'}`;
  return `${years} ${years === 1 ? 'año' : 'años'} y ${months} ${months === 1 ? 'mes' : 'meses'}`;
}

function groupByDate(entries: DiaryEntry[]): DiaryDay[] {
  const map = new Map<string, DiaryEntry[]>();
  for (const e of entries) {
    const bucket = map.get(e.date) ?? [];
    bucket.push(e);
    map.set(e.date, bucket);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, ents]) => ({ date, entries: ents }));
}

function EntryRow({ entry }: { entry: DiaryEntry }) {
  const meta        = ENTRY_TYPE_META[entry.type];
  const accentColor = meta.color === '#FAF6ED' ? '#417178' : meta.color;

  return (
    <article className={styles.entryRow}>
      <div className={styles.entryAccent} style={{ background: accentColor }} aria-hidden="true" />
      <div className={styles.entryInner}>
        <div className={styles.entryMeta}>
          <span className={styles.entryType} style={{ color: accentColor }}>{meta.label}</span>
          {entry.mood && (
            <span className={styles.entryMood} title={MOOD_META[entry.mood].label}>
              {MOOD_META[entry.mood].symbol}
            </span>
          )}
        </div>
        <p className={styles.entryBody}>{entry.body}</p>
      </div>
    </article>
  );
}

interface ProfileHeaderProps {
  child: Child;
  entryCount: number;
  onEdit: () => void;
  onBack: () => void;
}

function ProfileHeader({ child, entryCount, onEdit, onBack }: ProfileHeaderProps) {
  return (
    <div className={styles.profileHeader}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Volver">
        <ArrowLeft size={20} strokeWidth={2} />
      </button>

      <div className={styles.avatarRing}>
        <span className={styles.avatarEmoji} aria-hidden="true">{child.avatarEmoji}</span>
      </div>

      <div className={styles.profileMeta}>
        <span className={styles.profileEyebrow}>El libro de</span>
        <h1 className={styles.profileName}>{child.name}</h1>
        <p className={styles.profileAge}>{calcAge(child.birthDate)}</p>
        <p className={styles.profileCount}>
          {entryCount === 0
            ? 'Aún sin recuerdos guardados'
            : `${entryCount} ${entryCount === 1 ? 'recuerdo' : 'recuerdos'} guardados`}
        </p>
      </div>

      <button className={styles.editBtn} onClick={onEdit} aria-label={`Editar perfil de ${child.name}`}>
        <Pencil size={15} strokeWidth={2} />
        Editar
      </button>
    </div>
  );
}

export function ChildProfilePage() {
  const { id }     = useParams<{ id: string }>();
  const navigate   = useNavigate();
  const { user }   = useAuth();
  const { children, loading: childrenLoading } = useChildren();

  const [days, setDays]       = useState<DiaryDay[]>([]);
  const [loading, setLoading] = useState(true);

  const child = children.find((c) => c.id === id);

  const loadEntries = useCallback(async () => {
    if (!user || !id) return;
    setLoading(true);
    try {
      const entries = await fetchEntriesByChild(user.uid, id);
      setDays(groupByDate(entries));
    } catch {
      setDays([]);
    } finally {
      setLoading(false);
    }
  }, [user, id]);

  useEffect(() => { loadEntries(); }, [loadEntries]);

  // Si los hijos aún cargan, mostramos skeleton
  if (childrenLoading) {
    return (
      <main className={styles.page}>
        <div className={styles.skeletonHeader} />
        <div className={styles.skeletonTimeline}>
          {[80, 120, 100].map((h, i) => (
            <div key={i} className={styles.skeletonCard} style={{ height: h }} />
          ))}
        </div>
      </main>
    );
  }

  // Hijo no encontrado
  if (!child) {
    return (
      <main className={styles.page}>
        <button className={styles.backBtn} onClick={() => navigate('/app/hijos')} style={{ marginBottom: 24 }}>
          <ArrowLeft size={20} strokeWidth={2} />
          Volver
        </button>
        <div className={styles.empty}>
          <span className={styles.emptyIcon} aria-hidden="true">◌</span>
          <p className={styles.emptyTitle}>No encontramos este perfil</p>
        </div>
      </main>
    );
  }

  const totalEntries = days.reduce((acc, d) => acc + d.entries.length, 0);

  return (
    <main className={styles.page}>
      <ProfileHeader
        child={child}
        entryCount={totalEntries}
        onBack={() => navigate('/app/hijos')}
        onEdit={() => navigate(`/app/hijos/${child.id}/editar`)}
      />

      {/* Línea de tiempo del hijo */}
      {loading && (
        <div className={styles.skeletonTimeline}>
          {[80, 120, 100].map((h, i) => (
            <div key={i} className={styles.skeletonCard} style={{ height: h }} />
          ))}
        </div>
      )}

      {!loading && days.length === 0 && (
        <div className={styles.empty}>
          <span className={styles.emptyIcon} aria-hidden="true">◌</span>
          <p className={styles.emptyTitle}>Aún no hay recuerdos de {child.name}</p>
          <p className={styles.emptyText}>
            Cada vez que escribas algo en el Diario y lo vincules con {child.name},
            aparecerá aquí como parte de su historia.
          </p>
        </div>
      )}

      {!loading && days.length > 0 && (
        <div className={styles.timeline}>
          {days.map((day) => (
            <section key={day.date} className={styles.dayGroup}>
              <div className={styles.dayHeader}>
                <h2 className={styles.dayDate}>{formatDate(day.date)}</h2>
                <div className={styles.dayLine} aria-hidden="true" />
              </div>
              <div className={styles.entries}>
                {day.entries.map((entry) => (
                  <EntryRow key={entry.id} entry={entry} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
