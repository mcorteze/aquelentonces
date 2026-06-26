import { useEffect } from 'react';
import { onAuthChanged } from '../services/firebase/auth';
import { useAuthStore } from '../stores/authStore';
import type { AppUser } from '../types';

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthChanged((firebaseUser) => {
      if (firebaseUser) {
        const user: AppUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [setUser, setLoading]);

  return <>{children}</>;
}
