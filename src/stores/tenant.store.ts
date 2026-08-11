import { create } from "zustand";

export interface BranchInfo {
  id: string;
  name: string;
  city: string;
}

export const BRANCHES: BranchInfo[] = [
  { id: "b-1", name: "Anna Nagar", city: "Chennai" },
  { id: "b-2", name: "T. Nagar", city: "Chennai" },
  { id: "b-3", name: "Velachery", city: "Chennai" },
  { id: "b-4", name: "Indiranagar", city: "Bangalore" },
  { id: "b-5", name: "Koramangala", city: "Bangalore" },
];

export interface TenantState {
  tenantId: string;
  tenantName: string;
  activeBranch: string;
  branches: BranchInfo[];
  setActiveBranch: (branchName: string) => void;
  switchTenant: (id: string, name: string) => void;
}

export const useTenantStore = create<TenantState>((set) => ({
  tenantId: "salon_luxe_001",
  tenantName: "Luxe Studio & Spa",
  activeBranch: "Anna Nagar",
  branches: BRANCHES,
  setActiveBranch: (branchName: string) => set({ activeBranch: branchName }),
  switchTenant: (id: string, name: string) => set({ tenantId: id, tenantName: name }),
}));
