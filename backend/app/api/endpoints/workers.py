from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.api.deps import get_tenant_id
from app.models.user import User, UserRole
from app.schemas.auth import UserResponse

router = APIRouter()

@router.get("", response_model=list[UserResponse])
async def list_workers(
    tenant_id: str = Depends(get_tenant_id),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(User).where(User.tenant_id == tenant_id, User.role == UserRole.WORKER)
    )
    return result.scalars().all()
