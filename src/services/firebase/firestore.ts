import {
  getFirestore,
  doc,
  collection,
  updateDoc,
  serverTimestamp,
  type CollectionReference,
  type DocumentReference,
} from 'firebase/firestore';
import { app } from './init';
import type { DailyTask } from '../../modules/daily-tasks/types';

const db = getFirestore(app);

export function getUserDocRef(userId: string): DocumentReference {
  return doc(db, 'users', userId);
}

export function getDailyTasksRef(userId: string): CollectionReference<DailyTask> {
  return collection(db, 'users', userId, 'daily-tasks') as CollectionReference<DailyTask>;
}

export async function updateTaskStatus(
  userId: string,
  taskId: string,
  status: DailyTask['status']
): Promise<void> {
  const taskRef = doc(db, 'users', userId, 'daily-tasks', taskId);
  await updateDoc(taskRef, { status, updatedAt: serverTimestamp() });
}
