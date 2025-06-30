import React, { createContext, useEffect, useState } from "react";
import { api } from "../../lib/axios";

type UserContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  userId: string | null;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [userId, setUserId] = useState<string | null>(() => {
    return localStorage.getItem('userId');
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    }
    return false;
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ userId: string }>;
      setUserId(custom.detail.userId);
      setIsAuthenticated(true);
    };
    window.addEventListener('userLoggedIn', handler);
    return () => window.removeEventListener('userLoggedIn', handler);
  }, []);

  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );

};