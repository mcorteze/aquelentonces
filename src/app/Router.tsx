import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useChildren } from '../modules/children/hooks/useChildren';
import { Spinner } from '../components/ui/Spinner';
import { LoginScreen } from '../components/ui/LoginScreen';
import { LandingPage } from '../pages/landing/LandingPage';
import { AppLayout } from '../layouts/AppLayout';
import { HomePage } from '../modules/home/HomePage';
import { DailyTasksPage } from '../modules/daily-tasks/DailyTasksPage';
import { DiaryPage } from '../modules/diary/DiaryPage';
import { ProfilePage } from '../modules/profile/ProfilePage';
import { ChildrenListPage } from '../modules/children/ChildrenListPage';
import { ChildFormPage } from '../modules/children/ChildFormPage';
import { PrivateRoute } from './PrivateRoute';

function RedirectIfAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  return user ? <Navigate to="/app/inicio" replace /> : <>{children}</>;
}

/** Wrapper para pasar la lista de hijos a DiaryPage sin duplicar el fetch */
function DiaryPageWrapper() {
  const { children } = useChildren();
  return <DiaryPage children={children} />;
}

export function AppRouter() {
  const { loading } = useAuth();
  if (loading) return <Spinner />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <LoginScreen />
            </RedirectIfAuth>
          }
        />

        <Route
          path="/app"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index                    element={<Navigate to="/app/inicio" replace />} />
          <Route path="inicio"            element={<HomePage />} />
          <Route path="diario"            element={<DiaryPageWrapper />} />
          <Route path="tareas"            element={<DailyTasksPage />} />
          <Route path="hijos"             element={<ChildrenListPage />} />
          <Route path="hijos/nuevo"       element={<ChildFormPage />} />
          <Route path="hijos/:id/editar"  element={<ChildFormPage />} />
          <Route path="perfil"            element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
