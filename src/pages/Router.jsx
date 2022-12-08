import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthPage, LandingPage, LoginPage, RegisterPage } from './public';
import { PrivateRoute } from '@components';
import { Private } from './Private';

export default function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="auth" element={<AuthPage />}>
          <Route index element={<Navigate replace to={'/auth/login'} />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route
          path="private"
          element={
            <PrivateRoute>
              <Private />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<p>404 not found</p>} />
      </Routes>
    </BrowserRouter>
  );
}
