import { useEffect } from 'react';
import { onAuthChanged } from '../services/firebase/auth';
import { useAuthStore } from '../stores/authStore';
import { applyPalette, usePaletteStore } from '../stores/paletteStore';
import { getUserProfile, upsertUserProfile } from '../services/firebase/firestore';
import type { AppUser, PaletteId } from '../types';

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();
  const { setPalette } = usePaletteStore();

  useEffect(() => {
    // Aplicar paleta default antes de que Firebase resuelva (evita flash)
    applyPalette('kelvar');

    const unsubscribe = onAuthChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const user: AppUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        setUser(user);

        // Cargar o crear perfil en Firestore
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          if (profile) {
            setPalette(profile.paletteId as PaletteId);
          } else {
            // Primera vez: crear perfil base
            await upsertUserProfile(firebaseUser.uid, {
              displayName: firebaseUser.displayName ?? '',
              email: firebaseUser.email ?? '',
              photoURL: firebaseUser.photoURL ?? '',
              paletteId: 'kelvar',
            });
          }
        } catch {
          // Sin Firebase real todavía: silencioso, no bloquear la app
        }
      } else {
        setUser(null);
        applyPalette('kelvar');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [setUser, setLoading, setPalette]);

  return <>{children}</>;
}
