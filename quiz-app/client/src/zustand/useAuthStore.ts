// authStore.ts
import { create } from 'zustand'
import { persist } from "zustand/middleware";
interface State {
  token: string | null;
  user: User| null;
  setToken: (token: string) => void;
  setUser: (user: User)=>void;
  clearToken: () => void;
}
interface User {
  name: string;
  email: string;
}
export const useAuthStore = create<State>((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  setToken: (token: string) => {
    localStorage.setItem("token", token);
    set(() => ({ token }));
  },
  setUser: (user: User) => {
    set({user});
  },
  clearToken: () => {
    localStorage.removeItem("token");
    set(() => ({ token: null, user: null }));
  },
}));
