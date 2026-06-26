import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Spinner } from '../components/ui/Spinner';
import { LoginScreen } from '../components/ui/LoginScreen';
import { AuthLayout } from '../layouts/AuthLayout';
import { AppLayout } from '../layouts/AppLayout';
import { DailyTasksPage } from '../modules/daily-tasks/DailyTasksPage';
import { PrivateRoute } from './PrivateRoute';

export function AppRouter() {
  const { loading } = useAuth();

  if (loading) return <Spinner />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginScreen />
            </AuthLayout>
          }
        />
        <Route
          path="/app/tareas"
          element={
            <PrivateRoute>
              <AppLayout>
                <DailyTasksPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/app/tareas" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
