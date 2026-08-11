import { create } from "zustand";

export type UserRole = "OWNER" | "ADMIN" | "MANAGER" | "WORKER" | "CUSTOMER";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  activeSalonId: string;
}

export interface AuthState {
  user: UserSession | null;
  isAuthenticated: boolean;
  setRole: (role: UserRole) => void;
  setUser: (user: UserSession) => void;
  logout: () => void;
}

const DEFAULT_USER: UserSession = {
  id: "usr-admin-01",
  name: "Ananya Krishnan",
  email: "ananya@beautystudio.com",
  role: "ADMIN",
  activeSalonId: "salon_luxe_001",
};

export const useAuthStore = create<AuthState>((set) => ({
  user: DEFAULT_USER,
  isAuthenticated: true,
  setRole: (role: UserRole) =>
    set((state) => ({
      user: state.user ? { ...state.user, role } : { ...DEFAULT_USER, role },
    })),
  setUser: (user: UserSession) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
