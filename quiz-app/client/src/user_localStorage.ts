import { user } from "./models/userType";

const USER_LOCALSTORAGE_KEY = "token";

// helper to get user from localstorage
export function getStoredUser(): string | null {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredUser(token: string): void {
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(token));
}

export function clearStoredUser(): void {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
}
