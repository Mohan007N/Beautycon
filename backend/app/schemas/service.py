from pydantic import BaseModel

class ServiceBase(BaseModel):
    name: str
    category: str
    price: float
    duration_minutes: int
    image: str | None = None
    description: str | None = None

class ServiceCreate(ServiceBase):
    pass

class ServiceResponse(ServiceBase):
    id: str
    tenant_id: str
    bookings_count: int

    class Config:
        from_attributes = True
