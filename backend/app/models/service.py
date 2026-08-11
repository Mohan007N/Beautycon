import uuid
from sqlalchemy import String, Integer, Float, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base

class Service(Base):
    __tablename__ = "services"

    id: Mapped[str] = mapped_column(String(50), primary_key=True, default=lambda: f"srv-{uuid.uuid4().hex[:8]}")
    tenant_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True, default="tenant-luxe")
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    duration_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    image: Mapped[str] = mapped_column(String(255), nullable=True)
    description: Mapped[str] = mapped_column(String(255), nullable=True)
    bookings_count: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
