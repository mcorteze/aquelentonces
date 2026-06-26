import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import {
  fetchTemplates,
  fetchInstancesForDate,
  createOrUpdateInstance,
} from '../services/dailyTasksService';
import type { TaskTodayView, DayOfWeek } from '../types';

function todayDateString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function todayDayOfWeek(): DayOfWeek {
  return new Date().getDay() as DayOfWeek;
}

interface UseTasksResult {
  tasks: TaskTodayView[];
  loading: boolean;
  error: string | null;
  toggle: (templateId: string) => Promise<void>;
  reload: () => void;
}

export function useTodayTasks(): UseTasksResult {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<TaskTodayView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const date = todayDateString();
      const dow = todayDayOfWeek();

      const [templates, instances] = await Promise.all([
        fetchTemplates(user.uid),
        fetchInstancesForDate(user.uid, date),
      ]);

      const instanceMap = new Map(instances.map((i) => [i.templateId, i]));

      const todayTemplates = templates.filter(
        (t) => t.active && t.days.includes(dow)
      );

      const views: TaskTodayView[] = todayTemplates.map((t) => {
        const instance = instanceMap.get(t.id);
        return {
          templateId: t.id,
          instanceId: instance?.id ?? null,
          title: t.title,
          category: t.category,
          description: t.description,
          variationText: t.variations[String(dow)] ?? undefined,
          status: instance?.status ?? 'pending',
        };
      });

      setTasks(views);
    } catch {
      setError('No se pudieron cargar las tareas. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const toggle = useCallback(async (templateId: string) => {
    if (!user) return;
    const task = tasks.find((t) => t.templateId === templateId);
    if (!task) return;

    const newStatus = task.status === 'done' ? 'pending' : 'done';
    setTasks((prev) =>
      prev.map((t) => t.templateId === templateId ? { ...t, status: newStatus } : t)
    );

    try {
      const date = todayDateString();
      const dow = todayDayOfWeek();
      await createOrUpdateInstance(user.uid, templateId, date, dow, newStatus);
    } catch {
      setError('No se pudo actualizar la tarea.');
      setTasks((prev) =>
        prev.map((t) => t.templateId === templateId ? { ...t, status: task.status } : t)
      );
    }
  }, [user, tasks]);

  return { tasks, loading, error, toggle, reload: load };
}
