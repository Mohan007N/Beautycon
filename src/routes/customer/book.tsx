import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app/AppShell";
import { BookingStory } from "@/components/landing/BookingStory";

export const Route = createFileRoute("/customer/book")({
  head: () => ({
    meta: [
      { title: "Book an appointment — BeautyCon" },
      { name: "description", content: "Pick a service, stylist, date and time. Availability is confirmed instantly." },
      { property: "og:title", content: "Book an appointment — BeautyCon" },
      { property: "og:description", content: "Service, stylist, time — confirmed instantly." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="Book" sub="Service, stylist, time — confirmed instantly." />
      <div className="-mx-4 sm:-mx-6">
        <BookingStory />
      </div>
    </>
  );
}
