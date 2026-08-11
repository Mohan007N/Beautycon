import { useAuthStore } from "@/stores/auth.store";
import { useTenantStore } from "@/stores/tenant.store";

export interface ApiOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function apiFetch<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { tenantId } = useTenantStore.getState();
  const { user } = useAuthStore.getState();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-tenant-id": tenantId,
    ...(user ? { Authorization: `Bearer session_${user.id}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const url = new URL(endpoint, typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
  if (options.params) {
    Object.entries(options.params).forEach(([k, v]) => url.searchParams.append(k, v));
  }

  // Demo fallback response handling
  try {
    const res = await fetch(url.toString(), { ...options, headers });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return (await res.json()) as T;
  } catch (err) {
    // If backend endpoint isn't running live, log and throw appropriately
    throw err;
  }
}
