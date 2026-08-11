# BeautyCon — FastAPI Multi-Tenant Backend

Production-ready FastAPI backend for **BeautyCon Multi-Tenant SaaS Operating System**.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Run API Server locally
```bash
uvicorn app.main:app --reload --port 8000
```

The server will start at `http://127.0.0.1:8000`.

### 3. Interactive API Documentation
- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
- **Health Check**: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | JWT Login & Role Authentication |
| `POST` | `/api/v1/auth/register` | Register new user / customer |
| `GET` | `/api/v1/services` | List salon services with category filter |
| `POST` | `/api/v1/services` | Add new service to multi-tenant catalog |
| `GET` | `/api/v1/appointments` | Get appointments list |
| `POST` | `/api/v1/appointments` | Create appointment |
| `GET` | `/api/v1/analytics/overview` | Monthly revenue & utilization KPIs |
| `WS` | `/ws/realtime` | WebSocket slot lock broadcast engine |
