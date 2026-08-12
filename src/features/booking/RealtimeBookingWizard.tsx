import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Loader2, Scissors, Sparkles, User, AlertCircle, ShieldCheck, MapPin, Calendar as CalendarIcon, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBeautyConStore } from "@/lib/store";
import { socketManager } from "@/lib/socket/socket";
import { SOCKET_EVENTS } from "@/lib/socket/events";
import { toast } from "sonner";

const mockServices = [
  { id: "s-1", name: "Signature Hair Spa", price: 1400, duration: 60, cat: "Hair", image: "/images/hair_spa.png" },
  { id: "s-2", name: "24K Gold Glow Facial", price: 2400, duration: 75, cat: "Skin", image: "/images/gold_facial.png" },
  { id: "s-3", name: "French Balayage & Cut", price: 5600, duration: 120, cat: "Colour", image: "/images/balayage.png" },
  { id: "s-4", name: "Gel Polish Manicure", price: 900, duration: 45, cat: "Nails", image: "/images/gel_manicure.png" },
  { id: "s-5", name: "Beard Sculpting", price: 650, duration: 30, cat: "Grooming", image: "/images/beard_sculpt.png" },
];

const mockWorkers = [
  { id: "w-1", name: "Ananya", role: "Senior Stylist", rating: 4.9 },
  { id: "w-2", name: "Priya", role: "Skin Therapist", rating: 4.8 },
  { id: "w-3", name: "Arun", role: "Barber", rating: 4.7 },
  { id: "w-4", name: "Meera", role: "Colour Specialist", rating: 5.0 },
];

const mockSlots = [
  { time: "10:00 AM", available: true },
  { time: "11:30 AM", available: true },
  { time: "01:00 PM", available: false, lockedBy: "Another Client" },
  { time: "02:30 PM", available: true },
  { time: "04:00 PM", available: true },
  { time: "05:30 PM", available: true },
  { time: "07:00 PM", available: false, lockedBy: "Locked via App" },
];

export function RealtimeBookingWizard() {
  const { services, workers: storeWorkers, addAppointment, activeBranch } = useBeautyConStore();

  const serviceList = services.length > 0 ? services : mockServices;
  const workerList = storeWorkers.length > 0 ? storeWorkers : mockWorkers;

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedService, setSelectedService] = useState<any>(serviceList[0]!);
  const [selectedWorker, setSelectedWorker] = useState<any>(workerList[0]!);
  const [selectedDate, setSelectedDate] = useState("Today, Aug 12");
  const [selectedTime, setSelectedTime] = useState("05:30 PM");
  const [slots, setSlots] = useState(mockSlots);

  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [collisionWarning, setCollisionWarning] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Listen to Socket.IO real-time slot lock events
  useEffect(() => {
    const unsub = socketManager.on(SOCKET_EVENTS.SLOT_LOCKED, (data: { slotTime: string; user: string }) => {
      setSlots((prev) =>
        prev.map((s) => (s.time === data.slotTime ? { ...s, available: false, lockedBy: data.user } : s)),
      );
      if (selectedTime === data.slotTime) {
        setCollisionWarning(`Slot ${data.slotTime} was just reserved by ${data.user}. Please select another time.`);
        setSelectedTime("");
      }
    });

    return () => unsub();
  }, [selectedTime]);

  const handleSelectSlot = (time: string) => {
    setCollisionWarning(null);
    setSelectedTime(time);

    // Simulate socket emission locking slot on backend
    socketManager.emit(SOCKET_EVENTS.SLOT_LOCKED, {
      slotTime: time,
      user: "Current User",
    });
  };

  const handleConfirm = () => {
    setIsCheckingAvailability(true);

    // Transactional backend availability verification simulation
    setTimeout(() => {
      setIsCheckingAvailability(false);
      addAppointment({
        customer: "Maya Krish",
        service: selectedService.name,
        worker: selectedWorker.name,
        time: `${selectedDate} · ${selectedTime}`,
        duration: selectedService.duration,
        amount: selectedService.price,
        status: "confirmed",
      });
      setIsConfirmed(true);
      toast.success("Appointment Confirmed!", {
        description: `Booked ${selectedService.name} with ${selectedWorker.name} at ${selectedTime}`,
      });
    }, 1200);
  };

  if (isConfirmed) {
    return (
      <div className="rounded-3xl border border-gold/40 bg-card p-8 text-center shadow-lift max-w-xl mx-auto my-6">
        <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-gold/20 text-gold">
          <Check className="size-8 stroke-[3]" />
        </div>
        <span className="eyebrow text-gold">Instant Confirmation</span>
        <h2 className="mt-2 font-display text-3xl font-bold">{selectedService.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {selectedDate} at {selectedTime} · {selectedService.duration} mins
        </p>

        <div className="mt-6 rounded-2xl border border-border bg-background p-4 text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Salon Location:</span>
            <span className="font-semibold">Luxe Studio · {activeBranch}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Assigned Stylist:</span>
            <span className="font-semibold">{selectedWorker.name} ({selectedWorker.role})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Paid:</span>
            <span className="font-bold text-gold">₹{selectedService.price}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsConfirmed(false);
            setStep(1);
          }}
          className="mt-6 w-full rounded-2xl bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-lift max-w-2xl mx-auto my-4">
      {/* Step Indicator Header */}
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <div>
          <span className="eyebrow text-gold">Live Booking Wizard</span>
          <h2 className="font-display text-xl font-semibold">Reserve Your Appointment</h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <span className={cn("grid size-7 place-items-center rounded-full border text-xs", step === 1 ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground")}>1</span>
          <span className="text-muted-foreground">•</span>
          <span className={cn("grid size-7 place-items-center rounded-full border text-xs", step === 2 ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground")}>2</span>
          <span className="text-muted-foreground">•</span>
          <span className={cn("grid size-7 place-items-center rounded-full border text-xs", step === 3 ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground")}>3</span>
        </div>
      </div>

      {/* Collision Warning Alert */}
      {collisionWarning && (
        <div className="mb-4 flex items-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="size-4 shrink-0" />
          <span>{collisionWarning}</span>
        </div>
      )}

      {/* Step 1: Select Service */}
      {step === 1 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground mb-2">1. Pick a Service Menu</p>
          {serviceList.map((s: any) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedService(s)}
              className={cn(
                "flex w-full items-center gap-3.5 rounded-2xl border p-3 text-left transition-all cursor-pointer",
                selectedService.id === s.id
                  ? "border-gold bg-gold/10 shadow-sm ring-1 ring-gold"
                  : "border-border bg-background hover:bg-accent/40",
              )}
            >
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold font-bold text-base">
                ✂️
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm truncate">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.duration} mins · {s.category || s.cat || "Beauty"}</p>
              </div>
              <span className="font-bold text-sm text-gold shrink-0">₹{s.price}</span>
            </button>
          ))}

          <button
            type="button"
            onClick={() => setStep(2)}
            className="mt-4 w-full rounded-2xl bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-transform active:scale-[0.99]"
          >
            Continue to Stylist & Date
          </button>
        </div>
      )}

      {/* Step 2: Select Worker & Slots */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">2. Choose Preferred Stylist</p>
            <div className="grid grid-cols-2 gap-2">
              {workerList.map((w: any) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setSelectedWorker(w)}
                  className={cn(
                    "rounded-xl border p-3 text-left transition-all cursor-pointer",
                    selectedWorker.id === w.id
                      ? "border-gold bg-gold/5 font-semibold"
                      : "border-border bg-background hover:bg-accent/40",
                  )}
                >
                  <p className="text-xs font-semibold">{w.name}</p>
                  <p className="text-[10px] text-muted-foreground">{w.role} · ⭐ {w.rating || 4.9}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">3. Real-Time Slot Availability</p>
            <div className="grid grid-cols-3 gap-2">
              {slots.map((s) => (
                <button
                  key={s.time}
                  type="button"
                  disabled={!s.available}
                  onClick={() => handleSelectSlot(s.time)}
                  className={cn(
                    "rounded-xl border p-2.5 text-center text-xs font-semibold transition-all",
                    !s.available && "border-border/40 bg-muted/40 text-muted-foreground line-through cursor-not-allowed opacity-60",
                    s.available && selectedTime === s.time && "border-gold bg-gold text-ink shadow-sm",
                    s.available && selectedTime !== s.time && "border-border bg-background hover:border-gold/50 cursor-pointer",
                  )}
                >
                  {s.time}
                  {!s.available && <span className="block text-[9px] no-underline">Locked</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/3 rounded-2xl border border-border px-4 py-3 text-xs font-semibold hover:bg-accent"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!selectedTime}
              onClick={() => setStep(3)}
              className="w-2/3 rounded-2xl bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              Review Booking
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation Summary */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-background p-4 space-y-2.5 text-xs">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-semibold text-sm">{selectedService.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stylist:</span>
              <span className="font-semibold">{selectedWorker.name} ({selectedWorker.role})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date & Time:</span>
              <span className="font-semibold">{selectedDate} at {selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-semibold">Luxe Studio · {activeBranch}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-sm font-bold">
              <span>Total Amount:</span>
              <span className="text-gold">₹{selectedService.price}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-1/3 rounded-2xl border border-border px-4 py-3 text-xs font-semibold hover:bg-accent"
            >
              Back
            </button>
            <button
              type="button"
              disabled={isCheckingAvailability}
              onClick={handleConfirm}
              className="flex w-2/3 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {isCheckingAvailability ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Verifying Availability...
                </>
              ) : (
                <>
                  <CreditCard className="size-4" /> Pay ₹{selectedService.price} & Confirm
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
