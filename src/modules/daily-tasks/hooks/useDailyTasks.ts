import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { fetchDailyTasks, toggleTask } from '../services/dailyTasksService';
import type { DailyTask } from '../types';

interface UseDailyTasksResult {
  tasks: DailyTask[];
  loading: boolean;
  error: string | null;
  toggle: (taskId: string) => Promise<void>;
  reload: () => void;
}

export function useDailyTasks(): UseDailyTasksResult {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDailyTasks(user.uid);
      setTasks(data);
    } catch (e) {
      setError('No se pudieron cargar las tareas. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const toggle = useCallback(async (taskId: string) => {
    if (!user) return;
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => t.id === taskId ? { ...t, status: t.status === 'done' ? 'pending' : 'done' } : t)
    );
    try {
      await toggleTask(user.uid, taskId, task.status);
    } catch {
      setError('No se pudo actualizar la tarea.');
      setTasks((prev) =>
        prev.map((t) => t.id === taskId ? { ...t, status: task.status } : t)
      );
    }
  }, [user, tasks]);

  return { tasks, loading, error, toggle, reload: load };
}
