import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AuthManager } from "@/features/auth/AuthManager";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Get Started — BeautyCon" },
      { name: "description", content: "Register your salon on BeautyCon OS multi-tenant platform." },
      { property: "og:title", content: "Get Started — BeautyCon" },
      { property: "og:description", content: "Register your salon on BeautyCon." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <PublicLayout>
      <div className="pt-24 pb-16 px-4">
        <AuthManager mode="signup" />
      </div>
    </PublicLayout>
  );
}
