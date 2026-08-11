from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.api.deps import get_tenant_id
from app.models.service import Service
from app.schemas.service import ServiceCreate, ServiceResponse

router = APIRouter()

@router.get("", response_model=list[ServiceResponse])
async def list_services(
    tenant_id: str = Depends(get_tenant_id),
    category: str | None = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Service).where(Service.tenant_id == tenant_id)
    if category and category.lower() != "all":
        query = query.where(Service.category.ilike(category))
    
    result = await db.execute(query)
    services = result.scalars().all()
    return services

@router.post("", response_model=ServiceResponse)
async def create_service(
    service_in: ServiceCreate,
    tenant_id: str = Depends(get_tenant_id),
    db: AsyncSession = Depends(get_db)
):
    service = Service(
        tenant_id=tenant_id,
        name=service_in.name,
        category=service_in.category,
        price=service_in.price,
        duration_minutes=service_in.duration_minutes,
        image=service_in.image,
        description=service_in.description,
    )
    db.add(service)
    await db.commit()
    await db.refresh(service)
    return service
