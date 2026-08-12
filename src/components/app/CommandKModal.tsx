import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  User,
  Calendar,
  Scissors,
  BarChart3,
  Settings,
  Plus,
  ArrowRight,
  X,
  Sparkles,
  Zap,
} from "lucide-react";
import { customers } from "@/lib/mock-data";
import { useBeautyConStore } from "@/lib/store";

export function CommandKModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { appointments } = useBeautyConStore();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled externally or passed setter
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.tier.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredAppointments = appointments.filter(
    (a) =>
      a.customer.toLowerCase().includes(query.toLowerCase()) ||
      a.service.toLowerCase().includes(query.toLowerCase()) ||
      a.worker.toLowerCase().includes(query.toLowerCase()),
  );

  const quickActions = [
    { label: "Book New Appointment", icon: Plus, to: "/dashboard/overview", action: "modal" },
    { label: "View Customer CRM Pipeline", icon: User, to: "/dashboard/customers" },
    { label: "Manage Salon Services", icon: Scissors, to: "/dashboard/services" },
    { label: "Revenue & Growth Analytics", icon: BarChart3, to: "/dashboard/analytics" },
    { label: "Salon & Branch Settings", icon: Settings, to: "/dashboard/settings" },
  ].filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (to: string) => {
    navigate({ to });
    onClose();
    setQuery("");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        >
          {/* Search Header Input */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
            <Search className="size-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              autoFocus
              placeholder="Search clients, appointments, stylists, services, or commands (e.g., 'Priya', 'Hair Spa', 'Analytics')..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm font-medium focus:outline-none placeholder:text-muted-foreground/70"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="grid size-6 place-items-center rounded-lg hover:bg-accent"
              >
                <X className="size-3.5 text-muted-foreground" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-border bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
              ESC
            </kbd>
          </div>

          {/* Search Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4 custom-scrollbar">
            {/* Quick Actions */}
            {quickActions.length > 0 && (
              <div>
                <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Quick Navigation & Actions
                </p>
                <div className="space-y-1">
                  {quickActions.map((act) => (
                    <button
                      key={act.label}
                      type="button"
                      onClick={() => handleSelect(act.to)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs text-left font-medium hover:bg-accent transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid size-7 place-items-center rounded-lg border border-border bg-background group-hover:border-gold/40">
                          <act.icon className="size-3.5 text-gold" />
                        </div>
                        <span>{act.label}</span>
                      </div>
                      <ArrowRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customers Section */}
            {filteredCustomers.length > 0 && (
              <div>
                <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                  <span>CRM Clients ({filteredCustomers.length})</span>
                  <span className="text-[10px] font-normal lowercase">Press enter to view CRM profile</span>
                </p>
                <div className="space-y-1">
                  {filteredCustomers.slice(0, 4).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelect("/dashboard/customers")}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs text-left hover:bg-accent transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                          {c.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{c.name}</p>
                          <p className="text-[11px] text-muted-foreground">
                            Tier: <span className="font-medium text-gold">{c.tier}</span> · Last: {c.last}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-foreground">₹{c.spend.toLocaleString()}</span>
                        <p className="text-[10px] text-muted-foreground">{c.visits} visits</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Appointments Section */}
            {filteredAppointments.length > 0 && (
              <div>
                <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Recent Appointments
                </p>
                <div className="space-y-1">
                  {filteredAppointments.slice(0, 4).map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => handleSelect("/dashboard/appointments")}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs text-left hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Calendar className="size-4 text-gold shrink-0" />
                        <div>
                          <p className="font-medium">{a.service} · {a.customer}</p>
                          <p className="text-[11px] text-muted-foreground">Stylist: {a.worker} · {a.time}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold capitalize">
                        {a.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query &&
              quickActions.length === 0 &&
              filteredCustomers.length === 0 &&
              filteredAppointments.length === 0 && (
                <div className="py-12 text-center text-xs text-muted-foreground">
                  <Sparkles className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                  No results found for &ldquo;<span className="font-semibold">{query}</span>&rdquo;.
                </div>
              )}
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between border-t border-border bg-card/60 px-4 py-2.5 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-secondary px-1.5 py-0.5 text-[10px]">↑</kbd>
                <kbd className="rounded bg-secondary px-1.5 py-0.5 text-[10px]">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-secondary px-1.5 py-0.5 text-[10px]">↵</kbd> to select
              </span>
            </div>
            <span className="flex items-center gap-1 font-semibold text-gold">
              <Zap className="size-3" /> BeautyCon OS Search
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
