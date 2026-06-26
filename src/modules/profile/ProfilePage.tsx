import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { usePalette, PALETTES } from '../../hooks/usePalette';
import { updateUserDisplayName, updateUserPalette } from '../../services/firebase/firestore';
import { signOut } from '../../services/firebase/auth';
import { Check, User } from 'lucide-react';
import type { PaletteId } from '../../types';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const { user } = useAuth();
  const { paletteId, setPalette } = usePalette();

  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [logoutPhase, setLogoutPhase] = useState<'idle' | 'confirm'>('idle');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setDisplayName(user?.displayName ?? ''); }, [user]);

  const handleSaveName = async () => {
    if (!user || !displayName.trim()) return;
    setSaving(true);
    setSaveStatus('idle');
    try {
      await updateUserDisplayName(user.uid, displayName.trim());
      setSaveStatus('saved');
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => setSaveStatus('idle'), 2500);
    } catch {
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handlePaletteChange = async (id: PaletteId) => {
    setPalette(id);
    if (!user) return;
    try { await updateUserPalette(user.uid, id); } catch { /* silencioso */ }
  };

  const handleLogout = async () => {
    if (logoutPhase === 'idle') {
      setLogoutPhase('confirm');
      setTimeout(() => setLogoutPhase('idle'), 4000);
      return;
    }
    await signOut();
  };

  if (!user) return null;

  return (
    <main className={styles.page}>
      {/* Tu cuenta */}
      <section className={styles.section} aria-labelledby="identity-title">
        <p className={styles.sectionTitle} id="identity-title">Tu cuenta</p>

        <div className={styles.avatarRow}>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName ?? 'Tu foto'}
              className={styles.avatar}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className={styles.avatarPlaceholder} aria-hidden="true">
              <User size={40} strokeWidth={1.5} />
            </div>
          )}
          <div className={styles.avatarInfo}>
            <p className={styles.userName}>{user.displayName ?? 'Sin nombre'}</p>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        </div>

        <label htmlFor="display-name" className={styles.fieldLabel}>
          Tu nombre en la app
        </label>
        <input
          id="display-name"
          type="text"
          className={styles.input}
          value={displayName}
          onChange={e => { setDisplayName(e.target.value); setSaveStatus('idle'); }}
          onKeyDown={e => e.key === 'Enter' && handleSaveName()}
          placeholder="¿Cómo te llamas?"
          maxLength={40}
          autoComplete="off"
        />
        <p className={styles.fieldHint}>Así te reconocerá la app. No afecta tu cuenta de Google.</p>

        <div className={styles.saveRow}>
          <button
            className={styles.saveBtn}
            onClick={handleSaveName}
            disabled={saving || !displayName.trim() || displayName.trim() === (user.displayName ?? '')}
          >
            {saving ? 'Guardando...' : 'Guardar nombre'}
          </button>
          {saveStatus === 'saved' && (
            <span className={styles.saveStatus} role="status">
              <Check size={14} strokeWidth={2.5} /> Guardado
            </span>
          )}
          {saveStatus === 'error' && (
            <span className={styles.saveError} role="alert">No se pudo guardar. Intenta de nuevo.</span>
          )}
        </div>
      </section>

      {/* Color de la app */}
      <section className={styles.section} aria-labelledby="palette-title">
        <p className={styles.sectionTitle} id="palette-title">Color de la app</p>
        <div className={styles.palettesGrid} role="radiogroup" aria-label="Elige tu paleta de colores">
          {PALETTES.map((p) => (
            <button
              key={p.id}
              className={`${styles.paletteCard} ${paletteId === p.id ? styles.paletteCardActive : ''}`}
              onClick={() => handlePaletteChange(p.id as PaletteId)}
              role="radio"
              aria-checked={paletteId === p.id}
              aria-label={`Paleta ${p.label}`}
            >
              <div className={styles.palettePreview} style={{ background: p.bg }}>
                <div className={styles.paletteAccentDot} style={{ background: p.accent }} />
              </div>
              <div className={styles.paletteName}>
                <span>{p.label}</span>
                {paletteId === p.id && (
                  <span className={styles.paletteCheck} aria-hidden="true">
                    <Check size={13} strokeWidth={3} />
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Cerrar sesión */}
      <section className={styles.section}>
        <div className={styles.logoutSection}>
          <button
            className={`${styles.logoutBtn} ${logoutPhase === 'confirm' ? styles.logoutBtnConfirm : ''}`}
            onClick={handleLogout}
          >
            {logoutPhase === 'confirm' ? '¿Segura? Toca de nuevo para salir' : 'Cerrar sesión'}
          </button>
        </div>
      </section>
    </main>
  );
}
