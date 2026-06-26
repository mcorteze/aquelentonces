import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { fetchEntriesOnThisDay } from '../services/diaryService';
import type { DiaryEntry } from '../types';

function todayMonthDay(): string {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${m}-${d}`;
}

interface UseThisDayResult {
  entries: DiaryEntry[];
  loading: boolean;
}

export function useThisDayEntries(): UseThisDayResult {
  const { user } = useAuth();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const monthDay    = todayMonthDay();
      const currentYear = new Date().getFullYear();
      const result      = await fetchEntriesOnThisDay(user.uid, monthDay, currentYear);
      setEntries(result);
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  return { entries, loading };
}
