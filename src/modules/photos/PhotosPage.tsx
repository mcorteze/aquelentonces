import { useState } from 'react';
import { Plus, Image } from 'lucide-react';
import { usePhotos } from './hooks/usePhotos';
import { PhotoSheet } from './components/PhotoSheet';
import type { PhotoEntry } from './types';
import type { Child } from '../../types';
import styles from './PhotosPage.module.css';

const MONTHS = [
  'enero','febrero','marzo','abril','mayo','junio',
  'julio','agosto','septiembre','octubre','noviembre','diciembre',
];

function formatMonthYear(dateStr: string): string {
  const [y, m] = dateStr.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

function formatShortDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return `${d} ${MONTHS[m - 1].slice(0, 3)} ${y}`;
}

function monthKey(dateStr: string): string {
  return dateStr.slice(0, 7); // 'YYYY-MM'
}

// Seed determinista por id de foto para placeholder picsum
function placeholderUrl(photoId: string): string {
  return `https://picsum.photos/seed/aqphoto${photoId}/400/400`;
}

interface PhotoCardProps {
  photo: PhotoEntry;
  childMap: Map<string, Child>;
}

function PhotoCard({ photo, childMap }: PhotoCardProps) {
  const child = photo.childId ? childMap.get(photo.childId) : null;

  return (
    <article className={styles.photoCard}>
      <div className={styles.photoImageWrap}>
        {photo.imageUrl ? (
          <img src={photo.imageUrl} alt={photo.caption} className={styles.photoImage} loading="lazy" />
        ) : (
          <div className={styles.photoPlaceholder} aria-label="Foto pendiente de carga">
            <img
              src={placeholderUrl(photo.id)}
              alt=""
              className={styles.photoImage}
              loading="lazy"
            />
            <div className={styles.photoPlaceholderBadge} title="Foto no disponible aún">
              <Image size={12} strokeWidth={2} />
            </div>
          </div>
        )}
        {child && (
          <span className={styles.photoChildBadge} title={child.name}>
            {child.avatarEmoji}
          </span>
        )}
      </div>
      <div className={styles.photoBody}>
        <p className={styles.photoCaption}>{photo.caption}</p>
        <p className={styles.photoDate}>{formatShortDate(photo.date)}</p>
      </div>
    </article>
  );
}

interface Props {
  children: Child[];
}

export function PhotosPage({ children }: Props) {
  const { days, allPhotos, loading, error, reload } = usePhotos();
  const [sheetOpen, setSheetOpen] = useState(false);

  const childMap = new Map(children.map((c) => [c.id, c]));

  // Agrupar días por mes para la galería por meses
  const monthGroups = new Map<string, typeof days[0][]>();
  for (const day of days) {
    const mk     = monthKey(day.date);
    const bucket = monthGroups.get(mk) ?? [];
    bucket.push(day);
    monthGroups.set(mk, bucket);
  }
  const months = Array.from(monthGroups.keys()).sort((a, b) => b.localeCompare(a));

  const handleSaved = () => {
    setSheetOpen(false);
    reload();
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <span className={styles.eyebrow}>Aquelentonces</span>
          <h1 className={styles.title}>Fotos</h1>
          {!loading && allPhotos.length > 0 && (
            <p className={styles.subtitle}>
              {allPhotos.length} {allPhotos.length === 1 ? 'recuerdo' : 'recuerdos'} guardados
            </p>
          )}
        </div>
        <button
          className={styles.addBtn}
          onClick={() => setSheetOpen(true)}
          aria-label="Agregar foto comentada"
        >
          <Plus size={18} strokeWidth={2.5} />
          Agregar
        </button>
      </header>

      {error && (
        <div className={styles.error}>
          <span className={styles.errorText}>{error}</span>
          <button className={styles.retryBtn} onClick={reload}>Reintentar</button>
        </div>
      )}

      {/* Skeleton */}
      {loading && (
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.skeletonCard} />
          ))}
        </div>
      )}

      {/* Estado vacío */}
      {!loading && allPhotos.length === 0 && !error && (
        <div className={styles.empty}>
          <div className={styles.emptyImageGrid} aria-hidden="true">
            {['photo1','photo2','photo3','photo4'].map((seed) => (
              <img
                key={seed}
                src={`https://picsum.photos/seed/aqempty${seed}/200/200`}
                alt=""
                className={styles.emptyGridImg}
              />
            ))}
          </div>
          <p className={styles.emptyTitle}>Las fotos cuentan historias</p>
          <p className={styles.emptyText}>
            Cada imagen que guardes aquí lleva un pie de foto y queda fechada para siempre.
            Cuando llegue la cámara, cada texto ya tendrá su momento.
          </p>
          <button className={styles.emptyBtn} onClick={() => setSheetOpen(true)}>
            <Plus size={16} strokeWidth={2.5} />
            Guardar el primero
          </button>
        </div>
      )}

      {/* Galería por meses */}
      {!loading && months.length > 0 && (
        <div className={styles.gallery}>
          {months.map((mk) => {
            const monthDays = monthGroups.get(mk)!;
            const allInMonth = monthDays.flatMap((d) => d.photos);
            const firstDate  = monthDays[0].date;
            return (
              <section key={mk} className={styles.monthGroup}>
                <div className={styles.monthHeader}>
                  <h2 className={styles.monthTitle}>{formatMonthYear(firstDate)}</h2>
                  <span className={styles.monthCount}>{allInMonth.length}</span>
                  <div className={styles.monthLine} aria-hidden="true" />
                </div>
                <div className={styles.photoGrid}>
                  {allInMonth.map((photo) => (
                    <PhotoCard key={photo.id} photo={photo} childMap={childMap} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Sheet de nueva foto */}
      {sheetOpen && (
        <PhotoSheet
          children={children}
          onClose={() => setSheetOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </main>
  );
}
