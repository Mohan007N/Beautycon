import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { inr } from "@/lib/mock-data";
import { useBeautyConStore } from "@/lib/store";
import {
  Clock,
  UserCheck,
  Plus,
  Play,
  Calendar,
  X,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/operations")({
  head: () => ({
    meta: [
      { title: "Operations Live Floor & Queue — BeautyCon OS" },
      { name: "description", content: "Real-time salon floor tracking, customer waiting queue, and appointment inspection." },
      { property: "og:title", content: "Operations Live Floor & Queue — BeautyCon OS" },
      { property: "og:description", content: "Real-time floor tracking." },
    ],
  }),
  component: Page,
});

interface QueueItem {
  id: string;
  tokenNumber: string;
  customerName: string;
  serviceName: string;
  workerName: string;
  waitTimeMinutes: number;
  serviceTimeMinutes: number;
  status: "WAITING" | "BEING_SERVED" | "COMPLETED";
}

export function Page() {
  const { appointments } = useBeautyConStore();
  const [selectedQueueItem, setSelectedQueueItem] = useState<QueueItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const initialQueue: QueueItem[] = [
    {
      id: "q-1",
      tokenNumber: "#01",
      customerName: "Maya Krish",
      serviceName: "Hair Spa & Scalp Massage",
      workerName: "Ananya",
      waitTimeMinutes: 8,
      serviceTimeMinutes: 60,
      status: "WAITING",
    },
    {
      id: "q-2",
      tokenNumber: "#02",
      customerName: "Rahul Menon",
      serviceName: "Executive Beard Sculpt",
      workerName: "Arun",
      waitTimeMinutes: 3,
      serviceTimeMinutes: 30,
      status: "WAITING",
    },
    {
      id: "q-3",
      tokenNumber: "#03",
      customerName: "Riya Sharma",
      serviceName: "24K Gold Radiance Facial",
      workerName: "Priya",
      waitTimeMinutes: 0,
      serviceTimeMinutes: 75,
      status: "BEING_SERVED",
    },
    {
      id: "q-4",
      tokenNumber: "#04",
      customerName: "Ishita Bose",
      serviceName: "Balayage Colour Refresh",
      workerName: "Meera",
      waitTimeMinutes: 15,
      serviceTimeMinutes: 120,
      status: "WAITING",
    },
  ];

  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);

  const staffStatuses = [
    { id: "s1", name: "Ananya", role: "Senior Stylist", state: "WITH_CUSTOMER", currentTask: "Hair Spa · Maya Krish", timeRem: "14 min remaining" },
    { id: "s2", name: "Priya", role: "Skin Therapist", state: "WITH_CUSTOMER", currentTask: "Gold Facial · Riya", timeRem: "27 min remaining" },
    { id: "s3", name: "Arun", role: "Barber", state: "AVAILABLE", currentTask: "Ready for Walk-in", timeRem: "Available" },
    { id: "s4", name: "Meera", role: "Colour Specialist", state: "BREAK", currentTask: "15-min Break", timeRem: "8 min left" },
    { id: "s5", name: "Kavita", role: "Nail Artist", state: "WITH_CUSTOMER", currentTask: "Gel Polish", timeRem: "19 min remaining" },
    { id: "s6", name: "Rajesh", role: "Stylist", state: "OFFLINE", currentTask: "Off Shift", timeRem: "Off duty" },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updateStatus = (id: string, newStatus: QueueItem["status"]) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)),
    );
    setSelectedQueueItem(null);
    showToast(`Queue item updated to ${newStatus}`);
  };

  return (
    <>
      <PageTitle
        title="Live Salon Floor & Queue Operations"
        sub="Real-time waitlist, active station status, and inspector drawer."
      >
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> 12 Stations Online
          </span>
        </div>
      </PageTitle>

      {toastMessage && (
        <div className="mb-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="size-4" /> {toastMessage}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr] items-start">
        {/* LIVE QUEUE LIST */}
        <Panel title="Live Customer Queue">
          <div className="space-y-3">
            {queue.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedQueueItem(item)}
                className={cn(
                  "cursor-pointer rounded-2xl border p-4 transition-all shadow-soft flex items-center justify-between gap-3 hover:border-gold/50",
                  item.status === "BEING_SERVED"
                    ? "border-emerald-500/40 bg-emerald-500/5 ring-1 ring-emerald-500/20"
                    : "border-border bg-card/80",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-xl bg-primary/10 font-display font-bold text-sm text-primary">
                    {item.tokenNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">{item.customerName}</h4>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase border",
                          item.status === "BEING_SERVED" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
                          item.status === "WAITING" && "bg-amber-500/10 text-amber-600 border-amber-500/30",
                        )}
                      >
                        {item.status === "BEING_SERVED" ? "🟢 Serving Now" : "⏳ Waiting"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.serviceName} · Stylist: {item.workerName}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  {item.status === "WAITING" ? (
                    <p className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Clock className="size-3.5" /> Waiting {item.waitTimeMinutes} min
                    </p>
                  ) : (
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Play className="size-3.5" /> Serving Now
                    </p>
                  )}
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.serviceTimeMinutes} min service</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* LIVE SALON FLOOR WORKERS */}
        <Panel title="Live Salon Floor Stations">
          <div className="grid gap-3 sm:grid-cols-2">
            {staffStatuses.map((staff) => (
              <div key={staff.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{staff.name}</span>
                    <span className="text-[10px] text-muted-foreground">({staff.role})</span>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase border",
                      staff.state === "WITH_CUSTOMER" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
                      staff.state === "AVAILABLE" && "bg-blue-500/10 text-blue-600 border-blue-500/30",
                      staff.state === "BREAK" && "bg-amber-500/10 text-amber-600 border-amber-500/30",
                      staff.state === "OFFLINE" && "bg-slate-500/10 text-slate-600 border-slate-500/30",
                    )}
                  >
                    {staff.state.replace("_", " ")}
                  </span>
                </div>

                <div className="rounded-xl border border-border/60 bg-background/50 p-2.5">
                  <p className="text-xs font-medium text-foreground truncate">{staff.currentTask}</p>
                  <p className="text-[10px] font-semibold text-gold mt-1">{staff.timeRem}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* APPOINTMENT INSPECTOR DRAWER */}
      {selectedQueueItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <span className="eyebrow text-gold">Queue Token {selectedQueueItem.tokenNumber}</span>
                <h3 className="font-display text-xl font-bold mt-0.5">{selectedQueueItem.customerName}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQueueItem(null)}
                className="grid size-8 place-items-center rounded-full hover:bg-accent"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-secondary/40 p-3">
                <p className="text-[11px] text-muted-foreground">Booked Treatment</p>
                <p className="font-bold text-sm mt-0.5">{selectedQueueItem.serviceName}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-border bg-secondary/40 p-3">
                  <p className="text-[11px] text-muted-foreground">Assigned Stylist</p>
                  <p className="font-bold text-xs mt-0.5">{selectedQueueItem.workerName}</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/40 p-3">
                  <p className="text-[11px] text-muted-foreground">Wait Time</p>
                  <p className="font-bold text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                    {selectedQueueItem.waitTimeMinutes} mins
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <p className="eyebrow text-muted-foreground">Station Controls</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateStatus(selectedQueueItem.id, "BEING_SERVED")}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-3 text-xs font-semibold text-white hover:bg-emerald-500"
                >
                  <Play className="size-3.5" /> Start Service
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(selectedQueueItem.id, "COMPLETED")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border py-3 text-xs font-semibold hover:bg-accent"
                >
                  <CheckCircle2 className="size-3.5 text-gold" /> Mark Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
