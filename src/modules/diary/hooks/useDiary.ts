import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { fetchRecentEntries } from '../services/diaryService';
import type { DiaryEntry, DiaryDay } from '../types';

function groupByDate(entries: DiaryEntry[]): DiaryDay[] {
  const map = new Map<string, DiaryEntry[]>();
  for (const e of entries) {
    const bucket = map.get(e.date) ?? [];
    bucket.push(e);
    map.set(e.date, bucket);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, ents]) => ({ date, entries: ents }));
}

interface UseDiaryResult {
  days: DiaryDay[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export function useDiary(): UseDiaryResult {
  const { user } = useAuth();
  const [days, setDays]       = useState<DiaryDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const entries = await fetchRecentEntries(user.uid);
      setDays(groupByDate(entries));
    } catch {
      setError('No se pudo cargar el diario. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  return { days, loading, error, reload: load };
}
