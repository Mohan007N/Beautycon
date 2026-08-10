import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";

const items = [
  { label: "Home", to: "/customer" },
  { label: "Book", to: "/customer/book" },
  { label: "Appointments", to: "/customer/appointments" },
  { label: "Profile", to: "/customer/profile" },
];

export const Route = createFileRoute("/customer")({
  component: () => <AppShell items={items} brandNote="Maya Krish" />,
});
