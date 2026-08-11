import { create } from "zustand";

export type ConnectionStatus = "CONNECTED" | "RECONNECTING" | "DISCONNECTED";

export interface SocketState {
  status: ConnectionStatus;
  latencyMs: number;
  lastSyncAt: string;
  isLiveSimulation: boolean;
  setStatus: (status: ConnectionStatus) => void;
  setLatency: (ms: number) => void;
  updateLastSync: () => void;
  toggleLiveSimulation: () => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  status: "CONNECTED",
  latencyMs: 24,
  lastSyncAt: "Just now",
  isLiveSimulation: true,
  setStatus: (status: ConnectionStatus) => set({ status }),
  setLatency: (ms: number) => set({ latencyMs: ms }),
  updateLastSync: () => set({ lastSyncAt: new Date().toLocaleTimeString() }),
  toggleLiveSimulation: () => set((s) => ({ isLiveSimulation: !s.isLiveSimulation })),
}));
