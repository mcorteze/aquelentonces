import { useEffect } from 'react';
import { onAuthChanged } from '../services/firebase/auth';
import { useAuthStore } from '../stores/authStore';
import { applyPalette, usePaletteStore } from '../stores/paletteStore';
import { getUserProfile, upsertUserProfile } from '../services/firebase/firestore';
import type { AppUser, PaletteId } from '../types';

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const setUser    = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);
  const setPalette = usePaletteStore((s) => s.setPalette);

  useEffect(() => {
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

        try {
          const profile = await getUserProfile(firebaseUser.uid);
          if (profile) {
            setPalette(profile.paletteId as PaletteId);
          } else {
            await upsertUserProfile(firebaseUser.uid, {
              displayName: firebaseUser.displayName ?? '',
              email: firebaseUser.email ?? '',
              photoURL: firebaseUser.photoURL ?? '',
              paletteId: 'kelvar',
            });
          }
        } catch {
          // silencioso — no bloquear la app si Firestore falla
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
