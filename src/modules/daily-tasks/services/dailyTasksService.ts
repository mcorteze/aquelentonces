import { getDocs, orderBy, query } from 'firebase/firestore';
import { getDailyTasksRef, updateTaskStatus } from '../../../services/firebase/firestore';
import type { DailyTask, TaskStatus } from '../types';

export async function fetchDailyTasks(userId: string): Promise<DailyTask[]> {
  const ref = getDailyTasksRef(userId);
  const q = query(ref, orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createdAt: (data.createdAt as any)?.toDate?.() ?? new Date(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updatedAt: (data.updatedAt as any)?.toDate?.() ?? new Date(),
    } as DailyTask;
  });
}

export async function toggleTask(userId: string, taskId: string, current: TaskStatus): Promise<void> {
  const next: TaskStatus = current === 'done' ? 'pending' : 'done';
  await updateTaskStatus(userId, taskId, next);
}
