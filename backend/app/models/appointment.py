import uuid
from sqlalchemy import String, Float, Integer, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id: Mapped[str] = mapped_column(String(50), primary_key=True, default=lambda: f"apt-{uuid.uuid4().hex[:8]}")
    tenant_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True, default="tenant-luxe")
    branch_name: Mapped[str] = mapped_column(String(50), default="Anna Nagar")
    customer_name: Mapped[str] = mapped_column(String(100), nullable=False)
    service_name: Mapped[str] = mapped_column(String(100), nullable=False)
    worker_name: Mapped[str] = mapped_column(String(100), nullable=False)
    time_slot: Mapped[str] = mapped_column(String(50), nullable=False)
    duration_minutes: Mapped[int] = mapped_column(Integer, default=60)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="confirmed")
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
