import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}
