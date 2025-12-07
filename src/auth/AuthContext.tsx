import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// =============== CONFIG AUTOMATIQUE API_URL ===============
let API_URL = process.env.EXPO_PUBLIC_API_URL;

// 1. Si EXPO_PUBLIC_API_URL est vide ➝ fallback
if (!API_URL) {
  if (Platform.OS === 'android') API_URL = 'http://10.0.2.2:4000';
  else API_URL = 'http://localhost:4000'; // ← Ton IP LAN
}

console.log('🔗 AuthContext API_URL =', API_URL);

type User = {
  id: string;
  email: string;
  name: string;
  favorites: string[];
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  favorites: string[];
  addFavorite: (coinId: string) => Promise<void>;
  removeFavorite: (coinId: string) => Promise<void>;
  clearFavorites: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Axios instance
  const client = useMemo(() => {
    const instance = axios.create({ baseURL: API_URL });

    instance.interceptors.request.use(async (config) => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return instance;
  }, []);

  // Charger user si token existe
  useEffect(() => {
    (async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        if (!token) return;

        const { data } = await client.get('/api/auth/me');
        setUser(data);
      } catch (err) {
        console.warn('❌ AuthContext: Could not auto-login', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // =============== AUTH ACTIONS ===============

  const login = async (email: string, password: string) => {
    const { data } = await client.post('/api/auth/login', { email, password });
    await SecureStore.setItemAsync('token', data.token);
    setUser(data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await client.post('/api/auth/register', { name, email, password });
    await SecureStore.setItemAsync('token', data.token);
    setUser(data.user);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    setUser(null);
  };

  const addFavorite = async (coinId: string) => {
    if (!user) return;
    const { data } = await client.post('/api/favorites', { coinId });
    setUser({ ...user, favorites: data.favorites });
  };

  const removeFavorite = async (coinId: string) => {
    if (!user) return;
    const { data } = await client.delete(`/api/favorites/${coinId}`);
    setUser({ ...user, favorites: data.favorites });
  }

  async function clearFavorites() {
    if (!user) return;
    const { data } = await client.delete('/api/favorites/all');
    const newFavorites = Array.isArray(data.favorites) ? data.favorites : [];
    setUser((prev) => ({
      ...prev!,
      favorites: [...newFavorites],
    }));
    alert("Tous vos favoris ont été effacés");
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    favorites: user?.favorites ?? [],
    addFavorite,
    removeFavorite,
    clearFavorites,
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      favorites: user?.favorites ?? [],
      addFavorite,
      removeFavorite,
      clearFavorites
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};