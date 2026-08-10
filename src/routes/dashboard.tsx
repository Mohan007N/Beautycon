import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";

const items = [
  { label: "Overview", to: "/dashboard/overview" },
  { label: "Appointments", to: "/dashboard/appointments" },
  { label: "Workers", to: "/dashboard/workers" },
  { label: "Customers", to: "/dashboard/customers" },
  { label: "Services", to: "/dashboard/services" },
  { label: "Inventory", to: "/dashboard/inventory" },
  { label: "Payments", to: "/dashboard/payments" },
  { label: "Analytics", to: "/dashboard/analytics" },
  { label: "Settings", to: "/dashboard/settings" },
];

export const Route = createFileRoute("/dashboard")({
  component: () => <AppShell items={items} brandNote="Luxe Studio · Anna Nagar" />,
});
