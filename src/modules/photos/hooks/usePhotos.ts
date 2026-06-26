import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { fetchRecentPhotos } from '../services/photosService';
import type { PhotoEntry, PhotoDay } from '../types';

function groupByDate(photos: PhotoEntry[]): PhotoDay[] {
  const map = new Map<string, PhotoEntry[]>();
  for (const p of photos) {
    const bucket = map.get(p.date) ?? [];
    bucket.push(p);
    map.set(p.date, bucket);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, photos]) => ({ date, photos }));
}

interface UsePhotosResult {
  days: PhotoDay[];
  allPhotos: PhotoEntry[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export function usePhotos(): UsePhotosResult {
  const { user } = useAuth();
  const [allPhotos, setAllPhotos] = useState<PhotoEntry[]>([]);
  const [days, setDays]           = useState<PhotoDay[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const photos = await fetchRecentPhotos(user.uid);
      setAllPhotos(photos);
      setDays(groupByDate(photos));
    } catch {
      setError('No se pudieron cargar las fotos. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  return { days, allPhotos, loading, error, reload: load };
}
