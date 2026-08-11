import { ReactNode } from "react";
import { AppShell } from "@/components/app/AppShell";

const customerNavItems = [
  { label: "Home", to: "/customer" },
  { label: "Book", to: "/customer/book" },
  { label: "Appointments", to: "/customer/appointments" },
  { label: "Profile", to: "/customer/profile" },
];

export function CustomerLayout({ children }: { children?: ReactNode }) {
  return (
    <AppShell items={customerNavItems} brandNote="Maya Krish · Client Portal">
      {children}
    </AppShell>
  );
}
