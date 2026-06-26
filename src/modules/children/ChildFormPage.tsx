import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useChildren } from './hooks/useChildren';
import { ArrowLeft } from 'lucide-react';
import styles from './ChildFormPage.module.css';

const AVATAR_EMOJIS = [
  '🌟','🌈','🦋','🐱','🐶','🐰','🦊','🐻','🐼',
  '🐨','🦁','🐸','🐧','🦄','🐙','🌺','🍀','🎀','🎨',
  '🚀','🌙','☀️','🍭','🎵','🏆','💎','🌸','🎠','🌊','🦋',
];

function today() { return new Date().toISOString().slice(0, 10); }

interface FormErrors { name?: string; birthDate?: string; }

export function ChildFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const { children, loading, add, update } = useChildren();

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [avatarEmoji, setAvatarEmoji] = useState('🌟');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && !loading) {
      const child = children.find(c => c.id === id);
      if (child) {
        setName(child.name);
        setBirthDate(child.birthDate);
        setAvatarEmoji(child.avatarEmoji);
      }
    }
  }, [isEdit, id, children, loading]);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!name.trim()) e.name = 'El nombre es obligatorio.';
    else if (name.trim().length < 2) e.name = 'El nombre debe tener al menos 2 letras.';
    if (!birthDate) e.birthDate = 'La fecha de nacimiento es obligatoria.';
    else if (birthDate > today()) e.birthDate = 'La fecha no puede ser en el futuro.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setGlobalError(null);
    try {
      if (isEdit && id) {
        await update(id, { name: name.trim(), birthDate, avatarEmoji });
      } else {
        await add({ name: name.trim(), birthDate, avatarEmoji, order: children.length, active: true });
      }
      navigate('/app/hijos');
    } catch {
      setGlobalError('No se pudo guardar. Verifica tu conexión e intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/app/hijos')}>
        <ArrowLeft size={18} strokeWidth={2} />
        Volver
      </button>

      <h1 className={styles.title}>
        {isEdit ? 'Editar hijo/a' : 'Agregar hijo/a'}
      </h1>

      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="child-name" className={`${styles.label} ${styles.labelRequired}`}>
            Nombre
          </label>
          <input
            id="child-name"
            type="text"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            value={name}
            onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
            placeholder="Nombre de tu hijo/a"
            maxLength={40}
            autoComplete="off"
            autoFocus={!isEdit}
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <span id="name-error" className={styles.fieldError} role="alert">{errors.name}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="child-birth" className={`${styles.label} ${styles.labelRequired}`}>
            Fecha de nacimiento
          </label>
          <input
            id="child-birth"
            type="date"
            className={`${styles.input} ${errors.birthDate ? styles.inputError : ''}`}
            value={birthDate}
            onChange={e => { setBirthDate(e.target.value); setErrors(p => ({ ...p, birthDate: undefined })); }}
            max={today()}
            aria-describedby={errors.birthDate ? 'birth-error' : undefined}
            aria-invalid={Boolean(errors.birthDate)}
          />
          {errors.birthDate && (
            <span id="birth-error" className={styles.fieldError} role="alert">{errors.birthDate}</span>
          )}
        </div>

        <div className={styles.field}>
          <p className={styles.label} id="avatar-label">Avatar</p>
          <div className={styles.emojiGrid} role="radiogroup" aria-labelledby="avatar-label">
            {AVATAR_EMOJIS.map(emoji => (
              <button
                key={emoji}
                type="button"
                className={`${styles.emojiBtn} ${avatarEmoji === emoji ? styles.emojiBtnActive : ''}`}
                onClick={() => setAvatarEmoji(emoji)}
                role="radio"
                aria-checked={avatarEmoji === emoji}
                aria-label={`Avatar ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <p className={styles.fieldHint}>El avatar es temporal — pronto podrás subir una foto.</p>
        </div>

        {globalError && <p className={styles.globalError} role="alert">{globalError}</p>}

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Agregar hijo/a'}
          </button>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate('/app/hijos')} disabled={submitting}>
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}
