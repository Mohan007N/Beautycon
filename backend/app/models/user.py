import enum
import uuid
from sqlalchemy import String, DateTime, Enum, ForeignKey, Integer, func
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base

class UserRole(str, enum.Enum):
    OWNER = "OWNER"
    ADMIN = "ADMIN"
    MANAGER = "MANAGER"
    WORKER = "WORKER"
    CUSTOMER = "CUSTOMER"

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(50), primary_key=True, default=lambda: f"usr-{uuid.uuid4().hex[:8]}")
    tenant_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True, default="tenant-luxe")
    email: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), default=UserRole.CUSTOMER, nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    
    # Worker-specific fields
    specialization: Mapped[str] = mapped_column(String(100), nullable=True)
    utilization_percentage: Mapped[int] = mapped_column(Integer, default=85)
    
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
