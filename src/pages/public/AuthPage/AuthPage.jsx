import { useResetSession } from '../../../providers/SessionProvider';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AuthBG from '../../../assets/auth-bg';

const AuthPage = () => {
  const resetSession = useResetSession();

  useEffect(() => {
    resetSession();
  }, []);

  return (
    <div className="auth-bg">
      <AuthBG />
      <div className="center-form">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
