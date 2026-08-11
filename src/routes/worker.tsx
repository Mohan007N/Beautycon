import { createFileRoute } from "@tanstack/react-router";
import { WorkerLayout } from "@/layouts/WorkerLayout";

export const Route = createFileRoute("/worker")({
  component: () => <WorkerLayout />,
});
