import { useState } from 'react';
import { signInWithGoogle } from '../../services/firebase/auth';
import styles from './LoginScreen.module.css';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/popup-blocked':
    'Tu navegador bloqueó la ventana de inicio de sesión. Permite ventanas emergentes para este sitio e intenta de nuevo.',
  'auth/cancelled-popup-request':
    'La sesión fue cancelada. Haz clic en "Entrar con Google" de nuevo.',
  'auth/popup-closed-by-user':
    'Cerraste la ventana antes de terminar. Intenta de nuevo cuando quieras.',
  'auth/network-request-failed':
    'No hay conexión a internet. Verifica tu red e intenta de nuevo.',
  'auth/too-many-requests':
    'Demasiados intentos seguidos. Espera unos minutos e intenta de nuevo.',
  'auth/user-disabled':
    'Esta cuenta fue desactivada. Contacta soporte si crees que es un error.',
};

function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code: string }).code;
    return AUTH_ERROR_MESSAGES[code] ?? 'Ocurrió un error al iniciar sesión. Intenta de nuevo.';
  }
  return 'Ocurrió un error inesperado. Intenta de nuevo.';
}

export function LoginScreen() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card} role="main">
        <div className={styles.star} aria-hidden="true">⭐</div>

        <h1 className={styles.title}>Bienvenida</h1>
        <p className={styles.subtitle}>
          Tu espacio para acompañar el día a día<br />de tus hijos e hijas.
        </p>

        {error && (
          <div className={styles.error} role="alert" aria-live="assertive">
            <span className={styles.errorIcon} aria-hidden="true">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <button
          className={styles.btn}
          onClick={handleLogin}
          disabled={loading}
          aria-label="Iniciar sesión con tu cuenta de Google"
        >
          {loading ? (
            <span className={styles.spinner} aria-hidden="true" />
          ) : (
            <GoogleIcon />
          )}
          {loading ? 'Entrando...' : 'Entrar con Google'}
        </button>

        <p className={styles.privacy}>
          <span className={styles.privacyIcon} aria-hidden="true">🔒</span>
          Tus datos son privados y solo tú los puedes ver.
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className={styles.googleIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
