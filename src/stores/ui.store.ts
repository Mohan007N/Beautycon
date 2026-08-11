import { create } from "zustand";

export interface UIState {
  sidebarOpen: boolean;
  notifDrawerOpen: boolean;
  branchDropdownOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleNotifDrawer: () => void;
  setNotifDrawerOpen: (open: boolean) => void;
  toggleBranchDropdown: () => void;
  setBranchDropdownOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  notifDrawerOpen: false,
  branchDropdownOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  toggleNotifDrawer: () => set((s) => ({ notifDrawerOpen: !s.notifDrawerOpen })),
  setNotifDrawerOpen: (open: boolean) => set({ notifDrawerOpen: open }),
  toggleBranchDropdown: () => set((s) => ({ branchDropdownOpen: !s.branchDropdownOpen })),
  setBranchDropdownOpen: (open: boolean) => set({ branchDropdownOpen: open }),
}));
