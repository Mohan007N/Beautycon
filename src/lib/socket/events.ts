export const SOCKET_EVENTS = {
  // Booking & Appointments
  APPOINTMENT_CREATED: "appointment.created",
  APPOINTMENT_UPDATED: "appointment.updated",
  APPOINTMENT_CANCELLED: "appointment.cancelled",
  SLOT_LOCKED: "appointment.slot_locked",

  // Workers & Queue
  WORKER_STATUS_CHANGED: "worker.status_changed",
  WORKER_SCHEDULE_UPDATED: "worker.schedule_updated",
  QUEUE_UPDATED: "queue.updated",

  // Business & Inventory
  PAYMENT_COMPLETED: "payment.completed",
  INVENTORY_LOW_STOCK: "inventory.low_stock",

  // System & Notifications
  NOTIFICATION_CREATED: "notification.created",
  DASHBOARD_METRICS_UPDATED: "dashboard.metrics_updated",
} as const;

export type SocketEventType = typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS];
