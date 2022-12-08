import useSession from '../hooks/useSession';
import { createContext, useContext } from 'react';

const SessionContext = createContext(null);

function SessionProvider ({ children }) {
  const {
    session,
    setSession,
    resetSession,
    isError,
    isLoading,
    setNewSession
  } = useSession();

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
        isLoading,
        resetSession,
        isError,
        setNewSession
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

const useGetSession = () => useContext(SessionContext).session;
const useSetSession = () => useContext(SessionContext).setSession;
const useResetSession = () => useContext(SessionContext).resetSession;
const useIsLoadingSession = () => useContext(SessionContext).isLoading;
const useSetNewSession = () => useContext(SessionContext).setNewSession;
const useIsErrorSession = () => useContext(sessionStorage).isError;
const useSessionProvider = () => useContext(SessionContext);

export {
  useSessionProvider,
  useGetSession,
  useSetSession,
  useIsLoadingSession,
  useResetSession,
  useIsErrorSession,
  useSetNewSession
};
export default SessionProvider;
