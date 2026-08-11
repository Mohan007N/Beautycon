from pydantic import BaseModel

class BranchResponse(BaseModel):
    id: str
    name: str
    city: str
    address: str | None = None

    class Config:
        from_attributes = True

class TenantResponse(BaseModel):
    id: str
    name: str
    slug: str
    plan: str
    branches: list[BranchResponse] = []

    class Config:
        from_attributes = True
