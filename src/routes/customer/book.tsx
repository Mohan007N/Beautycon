import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app/AppShell";
import { RealtimeBookingWizard } from "@/features/booking/RealtimeBookingWizard";
import { BookingStory } from "@/components/landing/BookingStory";

export const Route = createFileRoute("/customer/book")({
  head: () => ({
    meta: [
      { title: "Book an appointment — BeautyCon" },
      { name: "description", content: "Pick a service, stylist, date and time. Real-time availability lock." },
      { property: "og:title", content: "Book an appointment — BeautyCon" },
      { property: "og:description", content: "Real-time slot lock — confirmed instantly." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle title="Instant Salon Booking" sub="Select your service, preferred stylist, and live available slot." />
      <RealtimeBookingWizard />
      <div className="-mx-4 sm:-mx-6 mt-12">
        <BookingStory />
      </div>
    </>
  );
}
