import { useState } from 'react';
import { X, Check } from 'lucide-react';
import styles from './TaskForm.module.css';
import { CATEGORY_IMAGE, CATEGORY_LABEL } from '../categoryImages';
import type { TaskCategory, DayOfWeek, TaskTemplate } from '../types';

const DAYS: { dow: DayOfWeek; label: string }[] = [
  { dow: 1, label: 'Lun' },
  { dow: 2, label: 'Mar' },
  { dow: 3, label: 'Mié' },
  { dow: 4, label: 'Jue' },
  { dow: 5, label: 'Vie' },
  { dow: 6, label: 'Sáb' },
  { dow: 0, label: 'Dom' },
];

const ALL_CATEGORIES: TaskCategory[] = [
  'rutina', 'deporte', 'escuela', 'arte',
  'social', 'salud', 'juego', 'familia', 'otro',
];

interface Props {
  initial?: Partial<TaskTemplate>;
  onSave: (data: Omit<TaskTemplate, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onClose: () => void;
}

export function TaskForm({ initial, onSave, onClose }: Props) {
  const [title, setTitle]           = useState(initial?.title ?? '');
  const [category, setCategory]     = useState<TaskCategory>(initial?.category ?? 'rutina');
  const [days, setDays]             = useState<DayOfWeek[]>(initial?.days ?? []);
  const [variations, setVariations] = useState<Record<string, string>>(initial?.variations ?? {});
  const [saving, setSaving]         = useState(false);

  const toggleDay = (dow: DayOfWeek) => {
    setDays((prev) =>
      prev.includes(dow) ? prev.filter((d) => d !== dow) : [...prev, dow]
    );
  };

  const setVariation = (dow: DayOfWeek, text: string) => {
    setVariations((prev) => ({ ...prev, [String(dow)]: text }));
  };

  const handleSave = async () => {
    if (!title.trim() || days.length === 0) return;
    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        category,
        days,
        variations,
        order: initial?.order ?? Date.now(),
        active: true,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const activeDays = DAYS.filter((d) => days.includes(d.dow));

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.sheet} role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className={styles.header}>
          <h2 className={styles.title} id="form-title">
            {initial?.id ? 'Editar actividad' : 'Nueva actividad'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        {/* Preview de la imagen seleccionada */}
        <div className={styles.imagePreview}>
          <img
            src={CATEGORY_IMAGE[category]}
            alt={CATEGORY_LABEL[category]}
            className={styles.imagePreviewImg}
            key={category}
          />
          <span className={styles.imagePreviewCaption}>{CATEGORY_LABEL[category]}</span>
        </div>

        {/* Nombre */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="task-title">Nombre de la actividad</label>
          <input
            id="task-title"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Fútbol, Lectura, Tarea del colegio…"
            maxLength={60}
            autoFocus
          />
        </div>

        {/* Categoría — grilla visual con imagen */}
        <div className={styles.field}>
          <span className={styles.label}>Imagen</span>
          <div className={styles.catGrid}>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.catCard} ${category === cat ? styles.catCardActive : ''}`}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                aria-label={CATEGORY_LABEL[cat]}
              >
                <img
                  src={CATEGORY_IMAGE[cat]}
                  alt=""
                  className={styles.catCardImg}
                  loading="lazy"
                />
                <span className={styles.catCardLabel}>{CATEGORY_LABEL[cat]}</span>
                <span className={styles.catCardCheck} aria-hidden="true">
                  <Check size={12} strokeWidth={3} color="#FFFFFF" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Días de la semana */}
        <div className={styles.field}>
          <span className={styles.label}>¿Qué días ocurre?</span>
          <div className={styles.days}>
            {DAYS.map(({ dow, label }) => (
              <button
                key={dow}
                type="button"
                className={`${styles.dayBtn} ${days.includes(dow) ? styles.dayBtnActive : ''}`}
                onClick={() => toggleDay(dow)}
                aria-pressed={days.includes(dow)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Variaciones por día */}
        {activeDays.length > 0 && (
          <div className={styles.field}>
            <span className={styles.label}>Detalle por día (opcional)</span>
            {activeDays.map(({ dow, label }) => (
              <div key={dow} className={styles.variationRow}>
                <div className={styles.variationDay}>{label}</div>
                <input
                  className={styles.variationInput}
                  value={variations[String(dow)] ?? ''}
                  onChange={(e) => setVariation(dow, e.target.value)}
                  placeholder={`Detalle para ${label}…`}
                  maxLength={80}
                />
              </div>
            ))}
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={onClose} type="button">
            Cancelar
          </button>
          <button
            className={styles.btnPrimary}
            onClick={handleSave}
            disabled={!title.trim() || days.length === 0 || saving}
            type="button"
          >
            {saving ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
}
