import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  type CollectionReference,
} from 'firebase/firestore';
import { app } from '../../../services/firebase/init';
import type { TaskTemplate, DailyInstance, DayOfWeek, TaskStatus } from '../types';

const db = getFirestore(app);

// ── Colecciones ───────────────────────────────────────────────────────────────

function templatesRef(uid: string): CollectionReference {
  return collection(db, 'users', uid, 'taskTemplates');
}

function instancesRef(uid: string): CollectionReference {
  return collection(db, 'users', uid, 'taskInstances');
}

// ── Templates ─────────────────────────────────────────────────────────────────

export async function fetchTemplates(uid: string): Promise<TaskTemplate[]> {
  const q = query(templatesRef(uid), orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title ?? '',
      category: data.category ?? 'otro',
      description: data.description ?? '',
      days: data.days ?? [],
      variations: data.variations ?? {},
      order: data.order ?? 0,
      active: data.active ?? true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createdAt: (data.createdAt as any)?.toDate?.() ?? new Date(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updatedAt: (data.updatedAt as any)?.toDate?.() ?? new Date(),
    } as TaskTemplate;
  });
}

export async function createTemplate(
  uid: string,
  data: Omit<TaskTemplate, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const ref = await addDoc(templatesRef(uid), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateTemplate(
  uid: string,
  templateId: string,
  data: Partial<Omit<TaskTemplate, 'id' | 'createdAt'>>
): Promise<void> {
  const ref = doc(db, 'users', uid, 'taskTemplates', templateId);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteTemplate(uid: string, templateId: string): Promise<void> {
  await deleteDoc(doc(db, 'users', uid, 'taskTemplates', templateId));
}

// ── Instances ─────────────────────────────────────────────────────────────────

export async function fetchInstancesForDate(
  uid: string,
  date: string
): Promise<DailyInstance[]> {
  const q = query(instancesRef(uid), where('date', '==', date));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      templateId: data.templateId ?? '',
      date: data.date ?? date,
      dayOfWeek: data.dayOfWeek ?? 0,
      status: data.status ?? 'pending',
      note: data.note ?? '',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      completedAt: (data.completedAt as any)?.toDate?.() ?? undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createdAt: (data.createdAt as any)?.toDate?.() ?? new Date(),
    } as DailyInstance;
  });
}

export async function createOrUpdateInstance(
  uid: string,
  templateId: string,
  date: string,
  dayOfWeek: DayOfWeek,
  status: TaskStatus
): Promise<string> {
  const q = query(
    instancesRef(uid),
    where('templateId', '==', templateId),
    where('date', '==', date)
  );
  const snap = await getDocs(q);

  if (!snap.empty) {
    const existing = snap.docs[0];
    await updateDoc(existing.ref, {
      status,
      completedAt: status === 'done' ? serverTimestamp() : null,
    });
    return existing.id;
  }

  const ref = await addDoc(instancesRef(uid), {
    templateId,
    date,
    dayOfWeek,
    status,
    completedAt: status === 'done' ? serverTimestamp() : null,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}
