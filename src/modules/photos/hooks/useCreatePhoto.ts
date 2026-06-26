import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { createPhoto } from '../services/photosService';
import type { PhotoEntry } from '../types';

interface UseCreatePhotoResult {
  saving: boolean;
  error: string | null;
  save: (data: Omit<PhotoEntry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
}

export function useCreatePhoto(): UseCreatePhotoResult {
  const { user }             = useAuth();
  const [saving, setSaving]  = useState(false);
  const [error, setError]    = useState<string | null>(null);

  const save = async (
    data: Omit<PhotoEntry, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<boolean> => {
    if (!user) return false;
    setSaving(true);
    setError(null);
    try {
      await createPhoto(user.uid, data);
      return true;
    } catch {
      setError('No se pudo guardar. Intenta de nuevo.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { saving, error, save };
}
