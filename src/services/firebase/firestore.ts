import {
  getFirestore,
  doc,
  collection,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query,
  type CollectionReference,
} from 'firebase/firestore';
import { app } from './init';
import type { UserProfile, Child, PaletteId } from '../../types';

const db = getFirestore(app);

// ── UserProfile ──────────────────────────────────────────────────────────────

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, 'users', uid, 'profile', 'main');
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const d = snap.data();
  return {
    uid,
    displayName: d.displayName ?? '',
    email: d.email ?? '',
    photoURL: d.photoURL ?? '',
    paletteId: d.paletteId ?? 'kelvar',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt: (d.createdAt as any)?.toDate?.() ?? new Date(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lastSeenAt: (d.lastSeenAt as any)?.toDate?.() ?? new Date(),
  };
}

export async function upsertUserProfile(
  uid: string,
  data: Partial<Omit<UserProfile, 'uid' | 'createdAt'>>
): Promise<void> {
  const ref = doc(db, 'users', uid, 'profile', 'main');
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { ...data, lastSeenAt: serverTimestamp() });
  } else {
    await setDoc(ref, {
      ...data,
      createdAt: serverTimestamp(),
      lastSeenAt: serverTimestamp(),
    });
  }
}

export async function updateUserPalette(uid: string, paletteId: PaletteId): Promise<void> {
  const ref = doc(db, 'users', uid, 'profile', 'main');
  await updateDoc(ref, { paletteId, lastSeenAt: serverTimestamp() });
}

export async function updateUserDisplayName(uid: string, displayName: string): Promise<void> {
  const ref = doc(db, 'users', uid, 'profile', 'main');
  await updateDoc(ref, { displayName, lastSeenAt: serverTimestamp() });
}

// ── Children ─────────────────────────────────────────────────────────────────

function getChildrenRef(uid: string): CollectionReference {
  return collection(db, 'users', uid, 'children');
}

export async function getChildren(uid: string): Promise<Child[]> {
  const ref = getChildrenRef(uid);
  const q = query(ref, orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name ?? '',
      birthDate: data.birthDate ?? '',
      avatarEmoji: data.avatarEmoji ?? '⭐',
      order: data.order ?? 0,
      active: data.active ?? true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createdAt: (data.createdAt as any)?.toDate?.() ?? new Date(),
    } as Child;
  });
}

export async function addChild(
  uid: string,
  child: Omit<Child, 'id' | 'createdAt'>
): Promise<string> {
  const ref = getChildrenRef(uid);
  const docRef = await addDoc(ref, { ...child, createdAt: serverTimestamp() });
  return docRef.id;
}

export async function updateChild(
  uid: string,
  childId: string,
  data: Partial<Omit<Child, 'id' | 'createdAt'>>
): Promise<void> {
  const ref = doc(db, 'users', uid, 'children', childId);
  await updateDoc(ref, data);
}

export async function deleteChild(uid: string, childId: string): Promise<void> {
  const ref = doc(db, 'users', uid, 'children', childId);
  await deleteDoc(ref);
}

