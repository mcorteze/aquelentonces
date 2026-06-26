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
import type { DiaryEntry, EntryType, MoodTag } from '../types';

const db = getFirestore(app);

function entriesRef(uid: string): CollectionReference {
  return collection(db, 'users', uid, 'diaryEntries');
}

function toEntry(id: string, data: Record<string, unknown>): DiaryEntry {
  return {
    id,
    date:           (data.date as string)        ?? '',
    type:           (data.type as EntryType)     ?? 'momento',
    body:           (data.body as string)        ?? '',
    mood:           (data.mood as MoodTag | undefined),
    childId:        (data.childId as string | undefined),
    tags:           (data.tags as string[])      ?? [],
    linkedTaskIds:  (data.linkedTaskIds as string[]) ?? [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt: (data.createdAt as any)?.toDate?.() ?? new Date(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updatedAt: (data.updatedAt as any)?.toDate?.() ?? new Date(),
  };
}

/** Últimas N entradas — para la línea de tiempo principal */
export async function fetchRecentEntries(uid: string, n = 60): Promise<DiaryEntry[]> {
  const q = query(entriesRef(uid), orderBy('date', 'desc'), orderBy('createdAt', 'desc'), limit(n));
  const snap = await getDocs(q);
  return snap.docs.map((d) => toEntry(d.id, d.data() as Record<string, unknown>));
}

/** Entradas de una fecha exacta */
export async function fetchEntriesForDate(uid: string, date: string): Promise<DiaryEntry[]> {
  const q = query(entriesRef(uid), where('date', '==', date), orderBy('createdAt', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => toEntry(d.id, d.data() as Record<string, unknown>));
}

/** Entradas de un hijo específico */
export async function fetchEntriesByChild(uid: string, childId: string, n = 60): Promise<DiaryEntry[]> {
  const q = query(
    entriesRef(uid),
    where('childId', '==', childId),
    orderBy('date', 'desc'),
    limit(n)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => toEntry(d.id, d.data() as Record<string, unknown>));
}

/** Crear entrada */
export async function createEntry(
  uid: string,
  data: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const ref = await addDoc(entriesRef(uid), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

/** Actualizar entrada */
export async function updateEntry(
  uid: string,
  entryId: string,
  data: Partial<Omit<DiaryEntry, 'id' | 'createdAt'>>
): Promise<void> {
  await updateDoc(doc(db, 'users', uid, 'diaryEntries', entryId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/** Eliminar entrada */
export async function deleteEntry(uid: string, entryId: string): Promise<void> {
  await deleteDoc(doc(db, 'users', uid, 'diaryEntries', entryId));
}
