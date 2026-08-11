from fastapi import APIRouter
from app.schemas.tenant import TenantResponse, BranchResponse

router = APIRouter()

mock_tenants = [
    TenantResponse(
        id="tenant-luxe",
        name="Luxe Studio",
        slug="luxe-studio",
        plan="ENTERPRISE",
        branches=[
            BranchResponse(id="br-1", name="Anna Nagar", city="Chennai", address="12th Main Road, Anna Nagar"),
            BranchResponse(id="br-2", name="T. Nagar", city="Chennai", address="GNC Road, T. Nagar"),
            BranchResponse(id="br-3", name="Velachery", city="Chennai", address="Phoenix Marketcity Mall"),
            BranchResponse(id="br-4", name="Indiranagar", city="Bangalore", address="100 Feet Road, Indiranagar"),
            BranchResponse(id="br-5", name="Koramangala", city="Bangalore", address="80 Feet Road, Koramangala"),
        ]
    )
]

@router.get("", response_model=list[TenantResponse])
async def list_tenants():
    return mock_tenants

@router.get("/{tenant_id}/branches", response_model=list[BranchResponse])
async def list_branches(tenant_id: str):
    return mock_tenants[0].branches
