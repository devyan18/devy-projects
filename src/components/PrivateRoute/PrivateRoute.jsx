import { useSessionProvider } from '../../providers/SessionProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectProvider from '../../providers/ProjectsProvider';

function PrivateRoute ({ children }) {
  const navigate = useNavigate();
  const auth = useSessionProvider();

  useEffect(() => {
    if (!auth.session && !auth.isLoading) {
      navigate('/auth');
    }
  }, [auth.isLoading]);

  if (auth.isLoading) {
    return <p>Loading...</p>;
  }

  return <ProjectProvider>{children}</ProjectProvider>;
}

export default PrivateRoute;
