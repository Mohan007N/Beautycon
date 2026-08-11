import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AuthManager } from "@/features/auth/AuthManager";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — BeautyCon" },
      { name: "description", content: "Sign in to your BeautyCon multi-tenant salon workspace." },
      { property: "og:title", content: "Sign in — BeautyCon" },
      { property: "og:description", content: "Access your BeautyCon workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <PublicLayout>
      <div className="pt-24 pb-16 px-4">
        <AuthManager mode="login" />
      </div>
    </PublicLayout>
  );
}
