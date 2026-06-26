import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  where,
  serverTimestamp,
  limit,
  type CollectionReference,
} from 'firebase/firestore';
import { app } from '../../../services/firebase/init';
import type { PhotoEntry } from '../types';

const db = getFirestore(app);

function photosRef(uid: string): CollectionReference {
  return collection(db, 'users', uid, 'photoEntries');
}

function toPhoto(id: string, data: Record<string, unknown>): PhotoEntry {
  return {
    id,
    caption:  (data.caption  as string)          ?? '',
    imageUrl: (data.imageUrl as string)          ?? '',
    date:     (data.date     as string)          ?? '',
    childId:  (data.childId  as string | undefined),
    tags:     (data.tags     as string[])        ?? [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt: (data.createdAt as any)?.toDate?.() ?? new Date(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updatedAt: (data.updatedAt as any)?.toDate?.() ?? new Date(),
  };
}

export async function fetchRecentPhotos(uid: string, n = 80): Promise<PhotoEntry[]> {
  const q = query(photosRef(uid), orderBy('date', 'desc'), orderBy('createdAt', 'desc'), limit(n));
  const snap = await getDocs(q);
  return snap.docs.map((d) => toPhoto(d.id, d.data() as Record<string, unknown>));
}

export async function fetchPhotosByChild(uid: string, childId: string, n = 60): Promise<PhotoEntry[]> {
  const q = query(
    photosRef(uid),
    where('childId', '==', childId),
    orderBy('date', 'desc'),
    limit(n)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => toPhoto(d.id, d.data() as Record<string, unknown>));
}

export async function createPhoto(
  uid: string,
  data: Omit<PhotoEntry, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const ref = await addDoc(photosRef(uid), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updatePhoto(
  uid: string,
  photoId: string,
  data: Partial<Omit<PhotoEntry, 'id' | 'createdAt'>>
): Promise<void> {
  await updateDoc(doc(db, 'users', uid, 'photoEntries', photoId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePhoto(uid: string, photoId: string): Promise<void> {
  await deleteDoc(doc(db, 'users', uid, 'photoEntries', photoId));
}
