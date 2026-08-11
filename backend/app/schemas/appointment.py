from pydantic import BaseModel

class AppointmentCreate(BaseModel):
    customer_name: str
    service_name: str
    worker_name: str
    time_slot: str
    duration_minutes: int = 60
    amount: float
    branch_name: str = "Anna Nagar"

class AppointmentUpdateStatus(BaseModel):
    status: str

class AppointmentResponse(AppointmentCreate):
    id: str
    tenant_id: str
    status: str

    class Config:
        from_attributes = True
