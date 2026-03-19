'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi } from '@/lib/api';
import Cookies from 'js-cookie';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isPremium: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isPremium = user?.subscription_status === 'premium' && 
    (user.subscription_expires_at ? new Date(user.subscription_expires_at) > new Date() : false);

  const refreshUser = async () => {
    try {
      const token = Cookies.get('auth_token');
      if (!token) {
        setUser(null);
        return;
      }
      const userData = await authApi.getUser() as User;
      setUser(userData);
    } catch (error) {
      Cookies.remove('auth_token');
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user: userData } = await authApi.login({ email, password });
    Cookies.set('auth_token', token, { expires: 30 });
    setUser(userData as User);
  };

  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    const { token, user: userData } = await authApi.register({ name, email, password, password_confirmation: passwordConfirmation });
    Cookies.set('auth_token', token, { expires: 30 });
    setUser(userData as User);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('auth_token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isPremium, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
