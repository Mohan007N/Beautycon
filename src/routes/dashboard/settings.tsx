import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Panel } from "@/components/app/AppShell";
import { useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Settings — BeautyCon Dashboard" },
      { name: "description", content: "Branch details, working hours and notification preferences." },
      { property: "og:title", content: "Settings — BeautyCon Dashboard" },
      { property: "og:description", content: "Branch, hours and notification preferences." },
    ],
  }),
  component: Page,
});

function Page() {
  const [branchName, setBranchName] = useState("Luxe Studio · Anna Nagar");
  const [openingTime, setOpeningTime] = useState("09:00");
  const [closingTime, setClosingTime] = useState("21:00");
  const [bookingWindowDays, setBookingWindowDays] = useState(30);
  const [minDeposit, setMinDeposit] = useState(200);
  const [enableWhatsapp, setEnableWhatsapp] = useState(true);
  const [enableSms, setEnableSms] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings Saved", {
      description: "Branch preferences and automated reminders updated.",
    });
  };

  return (
    <>
      <PageTitle title="Settings" sub="Branch configuration, operating hours, and notification rules." />

      <form onSubmit={handleSave} className="space-y-4">
        <Panel title="Branch & Location Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Branch Display Name
              </label>
              <input
                type="text"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Opening Time
                </label>
                <input
                  type="time"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Closing Time
                </label>
                <input
                  type="time"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Booking & Deposit Rules">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Advance Booking Window (Days)
              </label>
              <input
                type="number"
                value={bookingWindowDays}
                onChange={(e) => setBookingWindowDays(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Mandatory Advance Deposit Amount (₹)
              </label>
              <input
                type="number"
                value={minDeposit}
                onChange={(e) => setMinDeposit(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>
        </Panel>

        <Panel title="Automated Client Reminders">
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer rounded-xl border border-border p-3 hover:bg-accent/40 transition-colors">
              <div>
                <p className="text-sm font-semibold">WhatsApp Reminders</p>
                <p className="text-xs text-muted-foreground">Send automated WhatsApp confirmation & 2-hour reminder.</p>
              </div>
              <input
                type="checkbox"
                checked={enableWhatsapp}
                onChange={(e) => setEnableWhatsapp(e.target.checked)}
                className="size-4 rounded accent-primary cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer rounded-xl border border-border p-3 hover:bg-accent/40 transition-colors">
              <div>
                <p className="text-sm font-semibold">SMS Fallback Notifications</p>
                <p className="text-xs text-muted-foreground">Dispatch SMS alerts when WhatsApp delivery fails.</p>
              </div>
              <input
                type="checkbox"
                checked={enableSms}
                onChange={(e) => setEnableSms(e.target.checked)}
                className="size-4 rounded accent-primary cursor-pointer"
              />
            </label>
          </div>
        </Panel>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90 transition-transform active:scale-[0.98]"
          >
            <Save className="size-4" /> Save Settings
          </button>
        </div>
      </form>
    </>
  );
}
