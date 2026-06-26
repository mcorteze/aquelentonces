import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { createEntry } from '../services/diaryService';
import type { DiaryEntry } from '../types';

interface UseCreateEntryResult {
  saving: boolean;
  error: string | null;
  save: (data: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
}

export function useCreateEntry(): UseCreateEntryResult {
  const { user }           = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  const save = async (
    data: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<boolean> => {
    if (!user) return false;
    setSaving(true);
    setError(null);
    try {
      await createEntry(user.uid, data);
      return true;
    } catch {
      setError('No se pudo guardar la entrada. Intenta de nuevo.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { saving, error, save };
}
