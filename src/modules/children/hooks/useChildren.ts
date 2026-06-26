import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { getChildren, addChild, updateChild, deleteChild } from '../../../services/firebase/firestore';
import type { Child } from '../../../types';

interface UseChildrenResult {
  children: Child[];
  loading: boolean;
  error: string | null;
  reload: () => void;
  add: (data: Omit<Child, 'id' | 'createdAt'>) => Promise<string>;
  update: (id: string, data: Partial<Omit<Child, 'id' | 'createdAt'>>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useChildren(): UseChildrenResult {
  const { user } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getChildren(user.uid);
      setChildren(data);
    } catch {
      setError('No se pudieron cargar los datos. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const add = useCallback(async (data: Omit<Child, 'id' | 'createdAt'>) => {
    if (!user) throw new Error('No autenticado');
    const id = await addChild(user.uid, data);
    await load();
    return id;
  }, [user, load]);

  const update = useCallback(async (id: string, data: Partial<Omit<Child, 'id' | 'createdAt'>>) => {
    if (!user) throw new Error('No autenticado');
    await updateChild(user.uid, id, data);
    setChildren(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  }, [user]);

  const remove = useCallback(async (id: string) => {
    if (!user) throw new Error('No autenticado');
    await deleteChild(user.uid, id);
    setChildren(prev => prev.filter(c => c.id !== id));
  }, [user]);

  return { children, loading, error, reload: load, add, update, remove };
}
