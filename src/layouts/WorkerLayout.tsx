import { ReactNode } from "react";
import { AppShell } from "@/components/app/AppShell";

const workerNavItems = [
  { label: "Today", to: "/worker" },
  { label: "Schedule", to: "/worker/schedule" },
  { label: "Appointments", to: "/worker/appointments" },
  { label: "Profile", to: "/worker/profile" },
];

export function WorkerLayout({ children }: { children?: ReactNode }) {
  return (
    <AppShell items={workerNavItems} brandNote="Ananya · Senior Stylist Portal">
      {children}
    </AppShell>
  );
}
