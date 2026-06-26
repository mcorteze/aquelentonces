import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, type User } from 'firebase/auth';
import { app } from './init';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function signOut() {
  return firebaseSignOut(auth);
}

export function onAuthChanged(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
