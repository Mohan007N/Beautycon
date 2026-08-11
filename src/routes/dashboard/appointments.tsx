import { createFileRoute } from "@tanstack/react-router";
import { AppointmentsManager } from "@/features/appointments/AppointmentsManager";

export const Route = createFileRoute("/dashboard/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments — BeautyCon Dashboard" },
      { name: "description", content: "Every booking across chairs, rooms and stylists." },
      { property: "og:title", content: "Appointments — BeautyCon Dashboard" },
      { property: "og:description", content: "Every booking across chairs, rooms and stylists." },
    ],
  }),
  component: AppointmentsManager,
});
