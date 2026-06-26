import { useEffect, useRef, useState } from 'react';
import { useCreateEntry } from '../../modules/diary/hooks/useCreateEntry';
import { useActiveChildStore } from '../../stores/activeChildStore';
import { ENTRY_TYPE_META, MOOD_META } from '../../modules/diary/types';
import type { EntryType, MoodTag } from '../../modules/diary/types';
import type { Child } from '../../types';
import styles from './EntrySheet.module.css';

const TYPES: EntryType[] = ['momento', 'logro', 'anecdota', 'primer-vez', 'dia'];
const MOODS: MoodTag[]   = ['genial', 'especial', 'tranquilo', 'normal', 'dificil'];

function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

interface Props {
  children: Child[];
  onClose: () => void;
  onSaved: () => void;
}

export function EntrySheet({ children, onClose, onSaved }: Props) {
  const { save, saving } = useCreateEntry();
  const activeChild      = useActiveChildStore((s) => s.activeChild);
  const setActiveChild   = useActiveChildStore((s) => s.setActiveChild);

  const [type, setType]   = useState<EntryType>('momento');
  const [body, setBody]   = useState('');
  const [mood, setMood]   = useState<MoodTag | null>(null);
  const [childId, setChildId] = useState<string | undefined>(activeChild?.id);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Foco automático al abrir
  useEffect(() => {
    const t = setTimeout(() => textareaRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, []);

  // Sincronizar con hijo activo del store
  useEffect(() => {
    if (activeChild) setChildId(activeChild.id);
  }, [activeChild]);

  const handleChildSelect = (child: Child) => {
    setChildId(child.id);
    setActiveChild(child);
  };

  const handleSave = async () => {
    const trimmed = body.trim();
    if (!trimmed) return;
    const ok = await save({
      date:           todayString(),
      type,
      body:           trimmed,
      mood:           mood ?? undefined,
      childId,
      tags:           [],
      linkedTaskIds:  [],
    });
    if (ok) onSaved();
  };

  const meta = ENTRY_TYPE_META[type];

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.sheet} role="dialog" aria-modal="true" aria-label="Nueva entrada del diario">

        {/* Selector de tipo — barra de colores */}
        <div className={styles.typeBar}>
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              className={`${styles.typeBtn} ${type === t ? styles.typeBtnActive : ''}`}
              onClick={() => setType(t)}
              style={type === t ? { color: meta.color === '#FAF6ED' ? '#417178' : meta.color } : undefined}
              aria-pressed={type === t}
            >
              {ENTRY_TYPE_META[t].label}
            </button>
          ))}
        </div>

        {/* Cuerpo — prompt + textarea */}
        <div className={styles.body}>
          <p className={styles.prompt}>{meta.prompt}</p>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Escribe aquí…"
            maxLength={1200}
            aria-label="Texto de la entrada"
          />
        </div>

        {/* Selector de hijo — solo si hay más de uno */}
        {children.length > 0 && (
          <div className={styles.childRow}>
            <span className={styles.childLabel}>Para</span>
            {children.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`${styles.childBtn} ${childId === c.id ? styles.childBtnActive : ''}`}
                onClick={() => handleChildSelect(c)}
                aria-pressed={childId === c.id}
              >
                <span className={styles.childEmoji} aria-hidden="true">{c.avatarEmoji}</span>
                {c.name}
              </button>
            ))}
          </div>
        )}

        {/* Footer — mood + botones */}
        <div className={styles.footer}>
          <div className={styles.moodRow} role="group" aria-label="¿Cómo fue?">
            {MOODS.map((m) => (
              <button
                key={m}
                type="button"
                className={`${styles.moodBtn} ${mood === m ? styles.moodBtnActive : ''}`}
                onClick={() => setMood((prev) => prev === m ? null : m)}
                aria-pressed={mood === m}
                aria-label={MOOD_META[m].label}
                title={MOOD_META[m].label}
              >
                {MOOD_META[m].symbol}
              </button>
            ))}
          </div>
          <div className={styles.actions}>
            <button className={styles.cancelBtn} onClick={onClose} type="button">
              Cancelar
            </button>
            <button
              className={styles.saveBtn}
              onClick={handleSave}
              disabled={!body.trim() || saving}
              type="button"
            >
              {saving ? 'Guardando…' : 'Guardar'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
