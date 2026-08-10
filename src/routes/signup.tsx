import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/site/AuthForm";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Start free — BeautyCon" },
      { name: "description", content: "Create your BeautyCon workspace in minutes. 14 days free, no card required." },
      { property: "og:title", content: "Start free — BeautyCon" },
      { property: "og:description", content: "Create your salon workspace in minutes." },
    ],
  }),
  component: () => <AuthForm mode="signup" />,
});
