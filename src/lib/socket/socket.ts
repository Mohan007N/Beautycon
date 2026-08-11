import { useSocketStore } from "@/stores/socket.store";
import { SOCKET_EVENTS } from "./events";

type EventHandler = (data: any) => void;

class SocketManager {
  private listeners: Map<string, Set<EventHandler>> = new Map();

  constructor() {
    this.initHeartbeat();
  }

  private initHeartbeat() {
    if (typeof window === "undefined") return;

    // Simulate real-time ping/pong latency tracking
    setInterval(() => {
      const store = useSocketStore.getState();
      if (store.status === "CONNECTED") {
        const jitter = Math.floor(Math.random() * 10) - 5;
        store.setLatency(Math.max(12, 24 + jitter));
      }
    }, 5000);
  }

  public on(event: string, handler: EventHandler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);

    return () => this.off(event, handler);
  }

  public off(event: string, handler: EventHandler) {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.delete(handler);
    }
  }

  public emit(event: string, data: any) {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach((fn) => fn(data));
    }
  }

  public simulateDisconnectAndReconnect() {
    const store = useSocketStore.getState();
    store.setStatus("DISCONNECTED");

    setTimeout(() => {
      store.setStatus("RECONNECTING");
    }, 1500);

    setTimeout(() => {
      store.setStatus("CONNECTED");
      store.updateLastSync();
      this.emit(SOCKET_EVENTS.DASHBOARD_METRICS_UPDATED, { reconciledAt: new Date() });
    }, 3500);
  }
}

export const socketManager = new SocketManager();
