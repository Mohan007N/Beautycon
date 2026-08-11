import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  appointments as initialAppointments,
  customers as initialCustomers,
  inventory as initialInventory,
  payments as initialPayments,
  services as initialServices,
  workers as initialWorkers,
  type Appointment,
  type AppointmentStatus,
  type Worker,
} from "./mock-data";

export interface SystemNotification {
  id: string;
  time: string;
  title: string;
  description: string;
  type: "booking" | "payment" | "inventory" | "system";
  read: boolean;
}

export interface CustomerItem {
  id: string;
  name: string;
  visits: number;
  spend: number;
  last: string;
  tier: "Platinum" | "Gold" | "Silver";
  email?: string;
  phone?: string;
}

export interface InventoryItem {
  id: string;
  item: string;
  stock: number;
  reorder: number;
  supplier: string;
  unit: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  bookings: number;
}

export interface PaymentItem {
  id: string;
  customer: string;
  method: string;
  amount: number;
  status: "Settled" | "Pending";
  time: string;
}

export interface BeautyConState {
  // Data
  appointments: Appointment[];
  customers: CustomerItem[];
  inventory: InventoryItem[];
  services: ServiceItem[];
  workers: Worker[];
  payments: PaymentItem[];
  notifications: SystemNotification[];
  activeBranch: string;
  isLiveSimulation: boolean;

  // Actions
  addAppointment: (app: Omit<Appointment, "id">) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  addCustomer: (cust: Omit<CustomerItem, "id" | "visits" | "spend" | "last">) => void;
  updateInventoryStock: (id: string, delta: number) => void;
  addInventoryItem: (item: Omit<InventoryItem, "id">) => void;
  addService: (serv: Omit<ServiceItem, "id" | "bookings">) => void;
  toggleWorkerStatus: (id: string) => void;
  addWorker: (w: Omit<Worker, "id" | "utilization" | "rating" | "blocks">) => void;
  settlePayment: (id: string) => void;
  addPayment: (p: Omit<PaymentItem, "id" | "time" | "status">) => void;
  setActiveBranch: (branch: string) => void;
  toggleLiveSimulation: () => void;
  markNotificationsRead: () => void;
  clearNotifications: () => void;
}

const BeautyConContext = createContext<BeautyConState | undefined>(undefined);

export function BeautyConProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [customers, setCustomers] = useState<CustomerItem[]>(
    initialCustomers as CustomerItem[],
  );
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [payments, setPayments] = useState<PaymentItem[]>(initialPayments as PaymentItem[]);
  const [activeBranch, setActiveBranch] = useState("Anna Nagar");
  const [isLiveSimulation, setIsLiveSimulation] = useState(true);

  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: "n-1",
      time: "2 mins ago",
      title: "New Booking Confirmed",
      description: "Maya Krish booked Hair Spa with Ananya for 5:30 PM",
      type: "booking",
      read: false,
    },
    {
      id: "n-2",
      time: "15 mins ago",
      title: "Stock Alert",
      description: "24K Gold Facial Kit is below reorder point (4 left)",
      type: "inventory",
      read: false,
    },
    {
      id: "n-3",
      time: "1 hour ago",
      title: "Payment Received",
      description: "₹2,400 via UPI settled by Divya Raman",
      type: "payment",
      read: true,
    },
  ]);

  // Push notification helper
  const notify = (title: string, description: string, type: SystemNotification["type"]) => {
    const newNotif: SystemNotification = {
      id: `n-${Date.now()}`,
      time: "Just now",
      title,
      description,
      type,
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    toast.success(title, { description });
  };

  // Automated live simulation pulse
  useEffect(() => {
    if (!isLiveSimulation) return;

    const interval = setInterval(() => {
      const randomClients = ["Sneha Kapoor", "Rohan Verma", "Pooja Reddy", "Vikram Das"];
      const randomServices = ["Gold Facial", "Hair Spa", "Beard Sculpt", "Gel Manicure"];
      const randomWorkers = ["Ananya", "Priya", "Arun", "Meera"];

      const client = randomClients[Math.floor(Math.random() * randomClients.length)] || "Sneha Kapoor";
      const serviceName = randomServices[Math.floor(Math.random() * randomServices.length)] || "Hair Spa";
      const workerName = randomWorkers[Math.floor(Math.random() * randomWorkers.length)] || "Ananya";
      const amount = Math.floor(Math.random() * 30 + 10) * 100;
      const newId = `AP-${Math.floor(Math.random() * 9000 + 1000)}`;

      const newApp: Appointment = {
        id: newId,
        customer: client,
        service: serviceName,
        worker: workerName,
        time: "Just now",
        duration: 45,
        amount,
        status: "confirmed",
      };

      setAppointments((prev) => [newApp, ...prev.slice(0, 15)]);
      notify("⚡ Real-time Booking Pulse", `${client} booked ${serviceName} (₹${amount})`, "booking");
    }, 18000); // Trigger live event simulation every 18 seconds

    return () => clearInterval(interval);
  }, [isLiveSimulation]);

  const addAppointment = (app: Omit<Appointment, "id">) => {
    const newApp: Appointment = {
      ...app,
      id: `AP-${Math.floor(Math.random() * 8999 + 1000)}`,
    };
    setAppointments((prev) => [newApp, ...prev]);
    notify("Appointment Created", `${app.service} for ${app.customer} confirmed`, "booking");
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a)),
    );
    toast.info(`Appointment ${id} marked as ${status}`);
  };

  const addCustomer = (cust: Omit<CustomerItem, "id" | "visits" | "spend" | "last">) => {
    const newCust: CustomerItem = {
      ...cust,
      id: `C-${Date.now()}`,
      visits: 1,
      spend: 0,
      last: "Just now",
    };
    setCustomers((prev) => [newCust, ...prev]);
    notify("Customer Registered", `${cust.name} added to client directory`, "system");
  };

  const updateInventoryStock = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stock + delta);
          if (newStock <= item.reorder) {
            toast.warning(`Low Stock Warning: ${item.item} is at ${newStock} units`);
          }
          return { ...item, stock: newStock };
        }
        return item;
      }),
    );
  };

  const addInventoryItem = (item: Omit<InventoryItem, "id">) => {
    const newItem: InventoryItem = {
      ...item,
      id: `I-${Date.now()}`,
    };
    setInventory((prev) => [newItem, ...prev]);
    notify("Inventory Added", `${item.item} added to stock catalog`, "inventory");
  };

  const addService = (serv: Omit<ServiceItem, "id" | "bookings">) => {
    const newServ: ServiceItem = {
      ...serv,
      id: `S-${Date.now()}`,
      bookings: 0,
    };
    setServices((prev) => [newServ, ...prev]);
    notify("Service Added", `${serv.name} added to service menu`, "system");
  };

  const toggleWorkerStatus = (id: string) => {
    setWorkers((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const nextUtil = w.utilization > 0 ? 0 : 85;
          toast.info(`${w.name} status updated (${nextUtil > 0 ? "Active" : "On Break"})`);
          return { ...w, utilization: nextUtil };
        }
        return w;
      }),
    );
  };

  const addWorker = (w: Omit<Worker, "id" | "utilization" | "rating" | "blocks">) => {
    const newWorker: Worker = {
      ...w,
      id: `W-${Date.now()}`,
      utilization: 0,
      rating: 5.0,
      blocks: [],
    };
    setWorkers((prev) => [...prev, newWorker]);
    notify("Team Member Onboarded", `${w.name} added as ${w.role}`, "system");
  };

  const settlePayment = (id: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Settled" } : p)),
    );
    toast.success(`Payment ${id} marked as Settled`);
  };

  const addPayment = (p: Omit<PaymentItem, "id" | "time" | "status">) => {
    const newPayment: PaymentItem = {
      ...p,
      id: `TXN-${Math.floor(Math.random() * 8999 + 1000)}`,
      time: "Today · Just now",
      status: "Settled",
    };
    setPayments((prev) => [newPayment, ...prev]);
    notify("Payment Collected", `₹${p.amount} received via ${p.method}`, "payment");
  };

  const toggleLiveSimulation = () => {
    setIsLiveSimulation((v) => {
      const next = !v;
      toast.info(`Real-time simulation ${next ? "enabled" : "paused"}`);
      return next;
    });
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <BeautyConContext.Provider
      value={{
        appointments,
        customers,
        inventory,
        services,
        workers,
        payments,
        notifications,
        activeBranch,
        isLiveSimulation,
        addAppointment,
        updateAppointmentStatus,
        addCustomer,
        updateInventoryStock,
        addInventoryItem,
        addService,
        toggleWorkerStatus,
        addWorker,
        settlePayment,
        addPayment,
        setActiveBranch,
        toggleLiveSimulation,
        markNotificationsRead,
        clearNotifications,
      }}
    >
      {children}
    </BeautyConContext.Provider>
  );
}

export function useBeautyConStore() {
  const ctx = useContext(BeautyConContext);
  if (!ctx) {
    throw new Error("useBeautyConStore must be used within BeautyConProvider");
  }
  return ctx;
}
