import { useState } from "react";
import { useAuthStore, UserRole } from "@/stores/auth.store";
import { Shield, UserCheck, Key, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function AuthManager({ mode }: { mode: "login" | "signup" }) {
  const { user, setRole, setUser } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user?.email || "ananya@beautystudio.com");
  const [selectedRole, setSelectedRole] = useState<UserRole>(user?.role || "ADMIN");

  const rolesList: { role: UserRole; title: string; desc: string; redirect: string }[] = [
    { role: "OWNER", title: "Salon Owner / Admin", desc: "Full access to dashboard, analytics, revenue and settings", redirect: "/dashboard/overview" },
    { role: "ADMIN", title: "Manager / Receptionist", desc: "Manage appointments, inventory, POS payments & stylists", redirect: "/dashboard/overview" },
    { role: "WORKER", title: "Stylist / Barber", desc: "View today's schedule, assigned clients and payouts", redirect: "/worker" },
    { role: "CUSTOMER", title: "Client / Customer", desc: "Book services, view upcoming appointments and loyalty tier", redirect: "/customer" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);

    const activeConfig = rolesList.find((r) => r.role === selectedRole);
    toast.success(`Signed in as ${selectedRole}`, {
      description: `Welcome back to BeautyCon OS!`,
    });

    if (activeConfig) {
      navigate({ to: activeConfig.redirect as any });
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-lift my-8">
      <div className="text-center">
        <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-gold/10 text-gold">
          <Shield className="size-6" />
        </div>
        <h2 className="font-display text-2xl font-bold">
          {mode === "login" ? "Welcome to BeautyCon OS" : "Create BeautyCon Account"}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Select your multi-tenant role to launch your customized workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1">
            Select Multi-Tenant Role
          </label>
          <div className="space-y-2">
            {rolesList.map((r) => (
              <button
                key={r.role}
                type="button"
                onClick={() => setSelectedRole(r.role)}
                className={`flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                  selectedRole === r.role
                    ? "border-gold bg-gold/5 shadow-sm"
                    : "border-border bg-background hover:bg-accent/40"
                }`}
              >
                <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold ${
                  selectedRole === r.role ? "border-gold bg-gold text-ink" : "border-border"
                }`}>
                  {selectedRole === r.role && "✓"}
                </span>
                <div>
                  <p className="text-xs font-semibold">{r.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{r.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90 shadow-md transition-transform active:scale-[0.99]"
        >
          {mode === "login" ? "Sign In to Workspace" : "Register Salon & Role"}{" "}
          <ArrowRight className="size-4" />
        </button>
      </form>
    </div>
  );
}
