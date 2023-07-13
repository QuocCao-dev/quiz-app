// authStore.ts
import create from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  email: string;
  // Add more fields as needed
};

type AuthState = {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>(persist(
  (set) => ({
    token: null,
    user: null,
    setToken: (token) => set({ token }),
    setUser: (user) => set({ user }),
    clearAuth: () => set({ token: null, user: null }),
  }),
  {
    name: 'auth-storage', // unique name
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  }
));
