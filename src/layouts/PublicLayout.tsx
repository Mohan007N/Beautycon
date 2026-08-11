import { ReactNode } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";

export function PublicLayout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
