import { useState, useEffect } from 'react';
import { getUserDataFromToken } from '../services/user.service';
import {
  getTokenByLocalStorage,
  removeTokenFromLocalStorage,
  setTokenByLocalStorage
} from '../utilities/manageLocalStorage';

export default function useSession () {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  const setUserSession = (token) => {
    getUserDataFromToken(token)
      .then((response) => {
        setSession(response.data);
      })
      .catch(() => {
        removeTokenFromLocalStorage();
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const resetSession = () => {
    removeTokenFromLocalStorage();
    setSession(null);
  };

  const setNewSession = (token, user) => {
    setTokenByLocalStorage(token);
    setSession(user);
  };

  useEffect(() => {
    const token = getTokenByLocalStorage();

    if (!token) {
      setIsLoading(false);
      return;
    }

    setUserSession(token);
  }, []);

  return {
    session,
    setSession,
    resetSession,
    isLoading,
    isError,
    setNewSession
  };
}
