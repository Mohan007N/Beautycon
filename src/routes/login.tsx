import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/site/AuthForm";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — BeautyCon" },
      { name: "description", content: "Sign in to your BeautyCon salon console to manage bookings, staff and revenue." },
      { property: "og:title", content: "Sign in — BeautyCon" },
      { property: "og:description", content: "Access your BeautyCon workspace." },
    ],
  }),
  component: () => <AuthForm mode="login" />,
});
