'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';

export interface User {
  _id: string;
  name: string;
  email: string;
  plan: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://habitpilot-server.vercel.app/api'
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api');

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const { data } = await axios.post(
              `${api.defaults.baseURL}/auth/refresh`,
              {},
              { withCredentials: true }
            );
            const newToken = data.accessToken;
            localStorage.setItem('accessToken', newToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    if (pathname !== '/' && pathname !== '/login' && pathname !== '/register') {
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
