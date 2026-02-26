import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Strings } from '../constants';
import { createUser, findUser, initDatabase } from '../lib';
import {
  clearSession,
  generateSalt,
  getSession,
  hashPassword,
  saveSession,
} from '../lib';

export interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        initDatabase();
        const session = await getSession();
        if (session) {
          setUser({ username: session.username });
        }
      } catch (error) {
        console.error('Init error:', error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const existingUser = findUser(username);
      if (!existingUser) {
        return { success: false, error: Strings.auth.userNotFound };
      }
      const passwordHash = hashPassword(password, existingUser.salt);
      if (existingUser.passwordHash !== passwordHash) {
        return { success: false, error: Strings.auth.invalidPassword };
      }
      await saveSession(username);
      setUser({ username });
      return { success: true };
    } catch {
      return { success: false, error: Strings.auth.loginFailed };
    }
  }, []);

  const register = useCallback(async (username: string, password: string) => {
    try {
      const salt = generateSalt();
      const passwordHash = hashPassword(password, salt);
      const created = createUser(username, passwordHash, salt);
      if (!created) {
        return { success: false, error: Strings.auth.usernameExists };
      }
      await saveSession(username);
      setUser({ username });
      return { success: true };
    } catch {
      return { success: false, error: Strings.auth.registrationFailed };
    }
  }, []);

  const logout = useCallback(async () => {
    await clearSession();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
