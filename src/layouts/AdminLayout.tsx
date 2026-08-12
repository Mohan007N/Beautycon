import { ReactNode } from "react";
import { AppShell } from "@/components/app/AppShell";
import { useAuthStore } from "@/stores/auth.store";
import { ShieldAlert } from "lucide-react";
import { Link } from "@tanstack/react-router";

const adminNavItems = [
  { label: "Dashboard", icon: "⌂", to: "/dashboard/overview", group: "Main" },
  { label: "Live Floor", icon: "⚡", to: "/dashboard/operations", group: "Main" },
  { label: "Appointments", icon: "📅", to: "/dashboard/appointments", group: "Manage" },
  { label: "Customers", icon: "👥", to: "/dashboard/customers", group: "Manage" },
  { label: "Team", icon: "✂️", to: "/dashboard/workers", group: "Manage" },
  { label: "Services", icon: "💈", to: "/dashboard/services", group: "Manage" },
  { label: "Stock", icon: "📦", to: "/dashboard/inventory", group: "Manage" },
  { label: "Payments", icon: "💳", to: "/dashboard/payments", group: "Manage" },
  { label: "Reports", icon: "📈", to: "/dashboard/analytics", group: "Insights" },
  { label: "AI Helper", icon: "🤖", to: "/dashboard/ai", group: "Insights" },
  { label: "Settings", icon: "⚙️", to: "/dashboard/settings", group: "System" },
];

export function AdminLayout({ children }: { children?: ReactNode }) {
  const { user } = useAuthStore();

  // Role guard check
  const isAuthorized = user && ["OWNER", "ADMIN", "MANAGER"].includes(user.role);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
        <div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-destructive/10 text-destructive">
          <ShieldAlert className="size-6" />
        </div>
        <h1 className="text-xl font-bold">Admin Portal Access Restricted</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Your current role (<strong>{user?.role || "GUEST"}</strong>) does not have authorization to view owner/admin metrics.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            to="/login"
            className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
          >
            Switch Role / Login
          </Link>
          <Link
            to="/"
            className="rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold"
          >
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AppShell items={adminNavItems} brandNote="Luxe Studio · Owner Dashboard">
      {children}
    </AppShell>
  );
}
