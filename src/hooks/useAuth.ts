import { useAuthStore } from '../stores/authStore';

export function useAuth() {
  return useAuthStore((s) => ({ user: s.user, loading: s.loading, error: s.error }));
}
