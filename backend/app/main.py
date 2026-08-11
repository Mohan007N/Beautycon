from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from app.config import settings
from app.database import engine, Base, AsyncSessionLocal
from app.models import Service, User, UserRole, Appointment
from app.api.endpoints import auth, services, appointments, workers, customers, analytics, tenants
from app.websocket.manager import ws_manager

async def init_db_data():
    """Initializes tables and populates default seed services and demo users."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        # Check if services exist
        res = await session.execute(select(Service))
        if not res.scalars().first():
            demo_services = [
                Service(
                    name="Signature Hair Spa",
                    category="Hair",
                    price=1200.0,
                    duration_minutes=60,
                    image="/images/hair_spa.png",
                    description="Deep botanical nourishment & scalp pressure massage."
                ),
                Service(
                    name="24K Gold Facial",
                    category="Skin",
                    price=2400.0,
                    duration_minutes=75,
                    image="/images/gold_facial.png",
                    description="24K gold leaf radiance therapy & lymphatic drainage."
                ),
                Service(
                    name="French Balayage & Gloss",
                    category="Colour",
                    price=5600.0,
                    duration_minutes=120,
                    image="/images/balayage.png",
                    description="Sun-kissed hand-painted highlights & gloss toner."
                ),
                Service(
                    name="Gel Polish Manicure",
                    category="Nails",
                    price=900.0,
                    duration_minutes=45,
                    image="/images/gel_manicure.png",
                    description="Long-lasting gel polish, cuticle care & hand massage."
                ),
                Service(
                    name="Precision Beard Sculpting",
                    category="Grooming",
                    price=650.0,
                    duration_minutes=30,
                    image="/images/beard_sculpt.png",
                    description="Hot towel lather prep, straight-razor lineup & beard oil."
                ),
            ]
            session.add_all(demo_services)

        # Check if users exist
        res_users = await session.execute(select(User))
        if not res_users.scalars().first():
            demo_users = [
                User(
                    email="owner@beautycon.io",
                    name="Sophia Chen",
                    hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW", # "password"
                    role=UserRole.OWNER,
                    phone="+91 9876543210"
                ),
                User(
                    email="ananya@beautycon.io",
                    name="Ananya",
                    hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
                    role=UserRole.WORKER,
                    specialization="Senior Stylist & Colour Specialist",
                    utilization_percentage=94
                ),
                User(
                    email="maya@beautycon.io",
                    name="Maya Krish",
                    hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
                    role=UserRole.CUSTOMER,
                    phone="+91 9988776655"
                )
            ]
            session.add_all(demo_users)

        await session.commit()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db_data()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Auth"])
app.include_router(services.router, prefix=f"{settings.API_V1_STR}/services", tags=["Services"])
app.include_router(appointments.router, prefix=f"{settings.API_V1_STR}/appointments", tags=["Appointments"])
app.include_router(workers.router, prefix=f"{settings.API_V1_STR}/workers", tags=["Workers"])
app.include_router(customers.router, prefix=f"{settings.API_V1_STR}/customers", tags=["Customers"])
app.include_router(analytics.router, prefix=f"{settings.API_V1_STR}/analytics", tags=["Analytics"])
app.include_router(tenants.router, prefix=f"{settings.API_V1_STR}/tenants", tags=["Tenants"])

@app.get("/health")
async def health_check():
    return {"status": "ok", "version": settings.VERSION}

@app.websocket("/ws/realtime")
async def websocket_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            # Broadcast slot locking & updates to all connected clients
            await ws_manager.broadcast({
                "type": data.get("event", "SLOT_LOCKED"),
                "payload": data.get("payload", {})
            })
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
