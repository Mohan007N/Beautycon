export type AppointmentStatus = "confirmed" | "in-progress" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  customer: string;
  service: string;
  worker: string;
  time: string;
  duration: number;
  amount: number;
  status: AppointmentStatus;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  initials: string;
  utilization: number;
  rating: number;
  blocks: { start: number; end: number; label: string }[];
}

export const appointments: Appointment[] = [
  { id: "AP-4821", customer: "Maya Krish", service: "Hair Spa", worker: "Ananya", time: "5:30 PM", duration: 60, amount: 1200, status: "confirmed" },
  { id: "AP-4822", customer: "Rahul Menon", service: "Beard Sculpt", worker: "Arun", time: "6:00 PM", duration: 30, amount: 450, status: "in-progress" },
  { id: "AP-4823", customer: "Divya Raman", service: "Gold Facial", worker: "Priya", time: "6:30 PM", duration: 75, amount: 2400, status: "confirmed" },
  { id: "AP-4824", customer: "Ishita Bose", service: "Balayage", worker: "Meera", time: "7:00 PM", duration: 120, amount: 5600, status: "confirmed" },
  { id: "AP-4825", customer: "Karan Shah", service: "Deep Cleanse", worker: "Ananya", time: "7:30 PM", duration: 45, amount: 900, status: "completed" },
  { id: "AP-4826", customer: "Nila Suresh", service: "Bridal Trial", worker: "Priya", time: "8:00 PM", duration: 150, amount: 8500, status: "confirmed" },
];

export const workers: Worker[] = [
  {
    id: "W-01", name: "Ananya", role: "Senior Stylist", initials: "AN", utilization: 86, rating: 4.9,
    blocks: [{ start: 9, end: 11.5, label: "Hair Styling" }, { start: 13, end: 16, label: "Colour" }],
  },
  {
    id: "W-02", name: "Priya", role: "Skin Therapist", initials: "PR", utilization: 74, rating: 4.8,
    blocks: [{ start: 10, end: 12.5, label: "Facials" }, { start: 15, end: 17, label: "Bridal" }],
  },
  {
    id: "W-03", name: "Arun", role: "Barber", initials: "AR", utilization: 68, rating: 4.7,
    blocks: [{ start: 9, end: 10.5, label: "Grooming" }, { start: 12.5, end: 15.5, label: "Cuts" }],
  },
  {
    id: "W-04", name: "Meera", role: "Colour Specialist", initials: "ME", utilization: 91, rating: 5.0,
    blocks: [{ start: 11, end: 15, label: "Balayage" }],
  },
];

export const services = [
  { id: "S-1", name: "Hair Styling", category: "Hair", price: 1400, duration: 60, bookings: 312 },
  { id: "S-2", name: "Hair Spa", category: "Hair", price: 1200, duration: 60, bookings: 268 },
  { id: "S-3", name: "Gold Facial", category: "Skin", price: 2400, duration: 75, bookings: 194 },
  { id: "S-4", name: "Balayage", category: "Colour", price: 5600, duration: 120, bookings: 88 },
  { id: "S-5", name: "Gel Manicure", category: "Nails", price: 900, duration: 45, bookings: 241 },
  { id: "S-6", name: "Aroma Massage", category: "Spa", price: 2100, duration: 90, bookings: 132 },
];

export const customers = [
  { id: "C-1", name: "Maya Krish", visits: 24, spend: 48200, last: "2 days ago", tier: "Platinum" },
  { id: "C-2", name: "Rahul Menon", visits: 11, spend: 12400, last: "1 week ago", tier: "Gold" },
  { id: "C-3", name: "Divya Raman", visits: 32, spend: 76500, last: "Yesterday", tier: "Platinum" },
  { id: "C-4", name: "Ishita Bose", visits: 7, spend: 21800, last: "3 weeks ago", tier: "Silver" },
  { id: "C-5", name: "Karan Shah", visits: 15, spend: 18900, last: "5 days ago", tier: "Gold" },
];

export const inventory = [
  { id: "I-1", item: "Keratin Smoothing Serum", stock: 12, reorder: 10, supplier: "Lumière Pro", unit: 2400 },
  { id: "I-2", item: "24K Gold Facial Kit", stock: 4, reorder: 8, supplier: "Aureal", unit: 3100 },
  { id: "I-3", item: "Ammonia-free Colour — Ash", stock: 26, reorder: 12, supplier: "Chroma Lab", unit: 890 },
  { id: "I-4", item: "Argan Scalp Oil 200ml", stock: 7, reorder: 10, supplier: "Lumière Pro", unit: 1150 },
  { id: "I-5", item: "Gel Polish — Rosewood", stock: 31, reorder: 15, supplier: "Nailworks", unit: 640 },
];

export const payments = [
  { id: "TXN-9921", customer: "Divya Raman", method: "UPI", amount: 2400, status: "Settled", time: "Today · 11:04" },
  { id: "TXN-9922", customer: "Maya Krish", method: "Card", amount: 1200, status: "Settled", time: "Today · 12:20" },
  { id: "TXN-9923", customer: "Ishita Bose", method: "Wallet", amount: 5600, status: "Pending", time: "Today · 13:45" },
  { id: "TXN-9924", customer: "Karan Shah", method: "Cash", amount: 900, status: "Settled", time: "Today · 15:02" },
];

export const revenueSeries = [
  { label: "Mon", revenue: 42000, appointments: 38 },
  { label: "Tue", revenue: 51000, appointments: 44 },
  { label: "Wed", revenue: 47500, appointments: 41 },
  { label: "Thu", revenue: 62000, appointments: 55 },
  { label: "Fri", revenue: 78500, appointments: 67 },
  { label: "Sat", revenue: 96000, appointments: 82 },
  { label: "Sun", revenue: 71000, appointments: 61 },
];

export const retentionSeries = [
  { label: "Jan", retention: 71 }, { label: "Feb", retention: 74 }, { label: "Mar", retention: 76 },
  { label: "Apr", retention: 79 }, { label: "May", retention: 82 }, { label: "Jun", retention: 86 },
];

export const peakHours = [
  { label: "10a", load: 32 }, { label: "12p", load: 48 }, { label: "2p", load: 41 },
  { label: "4p", load: 66 }, { label: "6p", load: 92 }, { label: "8p", load: 74 },
];

export const serviceMix = [
  { name: "Hair", value: 42 },
  { name: "Skin", value: 24 },
  { name: "Nails", value: 18 },
  { name: "Spa", value: 16 },
];

export const locations = [
  {
    city: "Chennai",
    branches: [
      { name: "Anna Nagar", revenue: 482500, workers: 14, appointments: 1248, customers: 3120 },
      { name: "T. Nagar", revenue: 361400, workers: 11, appointments: 964, customers: 2410 },
      { name: "Velachery", revenue: 289000, workers: 9, appointments: 742, customers: 1880 },
    ],
  },
  {
    city: "Bangalore",
    branches: [
      { name: "Indiranagar", revenue: 524900, workers: 16, appointments: 1382, customers: 3640 },
      { name: "Koramangala", revenue: 447300, workers: 13, appointments: 1121, customers: 2970 },
    ],
  },
];

export const workerDay = [
  { time: "09:30", title: "Check-in", client: null, state: "done" as const },
  { time: "10:00", title: "Hair Styling", client: "Maya", state: "done" as const },
  { time: "11:30", title: "Facial", client: "Ananya", state: "active" as const },
  { time: "13:00", title: "Lunch", client: null, state: "upcoming" as const },
  { time: "14:00", title: "Hair Spa", client: "Rahul", state: "upcoming" as const },
  { time: "16:00", title: "Balayage", client: "Ishita", state: "upcoming" as const },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
