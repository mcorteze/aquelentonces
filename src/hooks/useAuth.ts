import { useAuthStore } from '../stores/authStore';

export function useAuth() {
  const user    = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const error   = useAuthStore((s) => s.error);
  return { user, loading, error };
}
