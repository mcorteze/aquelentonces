import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import {
  fetchTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from '../services/dailyTasksService';
import type { TaskTemplate } from '../types';

interface UseTaskTemplatesResult {
  templates: TaskTemplate[];
  loading: boolean;
  error: string | null;
  create: (data: Omit<TaskTemplate, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  update: (id: string, data: Partial<Omit<TaskTemplate, 'id' | 'createdAt'>>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  reload: () => void;
}

export function useTaskTemplates(): UseTaskTemplatesResult {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<TaskTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTemplates(user.uid);
      setTemplates(data);
    } catch {
      setError('No se pudieron cargar las tareas.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const create = useCallback(async (
    data: Omit<TaskTemplate, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    if (!user) return;
    await createTemplate(user.uid, data);
    await load();
  }, [user, load]);

  const update = useCallback(async (
    id: string,
    data: Partial<Omit<TaskTemplate, 'id' | 'createdAt'>>
  ) => {
    if (!user) return;
    await updateTemplate(user.uid, id, data);
    setTemplates((prev) =>
      prev.map((t) => t.id === id ? { ...t, ...data, updatedAt: new Date() } : t)
    );
  }, [user]);

  const remove = useCallback(async (id: string) => {
    if (!user) return;
    await deleteTemplate(user.uid, id);
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  }, [user]);

  return { templates, loading, error, create, update, remove, reload: load };
}
