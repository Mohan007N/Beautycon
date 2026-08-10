import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";

const items = [
  { label: "Today", to: "/worker" },
  { label: "Schedule", to: "/worker/schedule" },
  { label: "Appointments", to: "/worker/appointments" },
  { label: "Profile", to: "/worker/profile" },
];

export const Route = createFileRoute("/worker")({
  component: () => <AppShell items={items} brandNote="Ananya · Senior Stylist" />,
});
