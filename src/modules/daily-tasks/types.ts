export type TaskStatus = 'pending' | 'done';

export interface DailyTask {
  id: string;
  title: string;
  imageKey: string;    // nombre del archivo en /assets/tasks/ (sin path)
  status: TaskStatus;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
