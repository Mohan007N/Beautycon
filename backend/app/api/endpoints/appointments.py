from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.api.deps import get_tenant_id
from app.models.appointment import Appointment
from app.schemas.appointment import AppointmentCreate, AppointmentResponse, AppointmentUpdateStatus

router = APIRouter()

@router.get("", response_model=list[AppointmentResponse])
async def list_appointments(
    tenant_id: str = Depends(get_tenant_id),
    status: str | None = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Appointment).where(Appointment.tenant_id == tenant_id).order_by(Appointment.created_at.desc())
    if status and status != "all":
        query = query.where(Appointment.status == status)
    
    result = await db.execute(query)
    return result.scalars().all()

@router.post("", response_model=AppointmentResponse)
async def create_appointment(
    apt_in: AppointmentCreate,
    tenant_id: str = Depends(get_tenant_id),
    db: AsyncSession = Depends(get_db)
):
    appointment = Appointment(
        tenant_id=tenant_id,
        branch_name=apt_in.branch_name,
        customer_name=apt_in.customer_name,
        service_name=apt_in.service_name,
        worker_name=apt_in.worker_name,
        time_slot=apt_in.time_slot,
        duration_minutes=apt_in.duration_minutes,
        amount=apt_in.amount,
        status="confirmed"
    )
    db.add(appointment)
    await db.commit()
    await db.refresh(appointment)
    return appointment

@router.patch("/{appointment_id}/status", response_model=AppointmentResponse)
async def update_status(
    appointment_id: str,
    status_in: AppointmentUpdateStatus,
    tenant_id: str = Depends(get_tenant_id),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Appointment).where(Appointment.id == appointment_id, Appointment.tenant_id == tenant_id)
    )
    apt = result.scalars().first()
    if not apt:
        raise HTTPException(status_code=404, detail="Appointment not found")

    apt.status = status_in.status
    await db.commit()
    await db.refresh(apt)
    return apt
