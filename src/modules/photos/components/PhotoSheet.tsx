import { useEffect, useRef, useState } from 'react';
import { Image } from 'lucide-react';
import { useCreatePhoto } from '../hooks/useCreatePhoto';
import type { Child } from '../../../types';
import styles from './PhotoSheet.module.css';

function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

interface Props {
  children: Child[];
  onClose: () => void;
  onSaved: () => void;
}

export function PhotoSheet({ children, onClose, onSaved }: Props) {
  const { save, saving } = useCreatePhoto();
  const [caption, setCaption] = useState('');
  const [childId, setChildId] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, []);

  const handleSave = async () => {
    const trimmed = caption.trim();
    if (!trimmed) return;
    const ok = await save({
      caption: trimmed,
      imageUrl: '',          // Storage diferido
      date: todayString(),
      childId,
      tags: [],
    });
    if (ok) onSaved();
  };

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.sheet} role="dialog" aria-modal="true" aria-label="Nueva foto comentada">

        {/* Zona de imagen — placeholder hasta que se integre Storage */}
        <div className={styles.imagePlaceholder} aria-label="Espacio para foto (próximamente)">
          <Image size={36} strokeWidth={1.5} className={styles.imagePlaceholderIcon} />
          <span className={styles.imagePlaceholderText}>La cámara llega pronto</span>
          <span className={styles.imagePlaceholderSub}>Por ahora guarda el recuerdo con palabras</span>
        </div>

        {/* Pie de foto */}
        <div className={styles.captionWrap}>
          <p className={styles.captionLabel}>¿Qué pasó en este momento?</p>
          <textarea
            ref={inputRef}
            className={styles.captionInput}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Describe lo que ves en esta foto…"
            maxLength={600}
            aria-label="Pie de foto"
            rows={3}
          />
        </div>

        {/* Selector de hijo */}
        {children.length > 0 && (
          <div className={styles.childRow}>
            <span className={styles.childLabel}>Para</span>
            {children.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`${styles.childBtn} ${childId === c.id ? styles.childBtnActive : ''}`}
                onClick={() => setChildId((prev) => prev === c.id ? undefined : c.id)}
                aria-pressed={childId === c.id}
              >
                <span aria-hidden="true">{c.avatarEmoji}</span>
                {c.name}
              </button>
            ))}
          </div>
        )}

        {/* Acciones */}
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose} type="button">
            Cancelar
          </button>
          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={!caption.trim() || saving}
            type="button"
          >
            {saving ? 'Guardando…' : 'Guardar recuerdo'}
          </button>
        </div>

      </div>
    </div>
  );
}
