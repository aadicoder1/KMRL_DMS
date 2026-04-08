
# 🚇 KMRL DMS — Smart Engine of Directives for Kochi Metro Rail Limited

<div align="center">
    <img src="https://res.cloudinary.com/dvdozdbsh/image/upload/v1758653644/Screenshot_From_2025-09-24_00-01-15_w3den6.png" alt="KOCHI" width="300">
    
  </a>
  <h3>A Smart Engine of Directives for Kochi Metro Rail Limited (KMRL)</h3>
  
</div>

---

## 📋 Table of Contents

- [Introduction](#introduction)  
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [Quick Start](#quick-start)  
- [Environment Variables](#environment-variables)  
- [Docker & NLTK / Tesseract Setup](#docker--nltk--tesseract-setup)  
- [API Examples (history)](#api-examples-history)  
- [Project Structure](#project-structure)  
- [Notes & Recommendations](#notes--recommendations)

---

## 🤖 Introduction

KMRLSIH converts fragmented and multilingual documents into **searchable, prioritized directives**.

- ➜ **Ingest** → WhatsApp, Email, Maximo, SharePoint, manual uploads.  
- ➜ **Process** → Five-stage AI pipeline: OCR → NLP → Semantic chunking → Entity extraction & summarization → Indexing.  
- ➜ **Classify** → Priority detection (urgent / medium / low) and trigger notifications.  
- ➜ **Deliver** → Role-based dashboards (English & Malayalam) with full audit logs.

---

## ⚙️ Tech Stack

- **Frontend:** React (Vite)  
- **Backend:** FastAPI (Python)  
- **AI/ML:** OCR, NLP, Transformer models, FAISS vector store  
- **Database:** PostgreSQL (structured data), FAISS (vector search)  
- **Cache:** Redis  
- **Notifications:** EmailJS (example), extendable to SMS/Push  
- **Deployment:** Docker / Docker Compose

---

## 🔋 Features

- ➜ **Unified Upload Hub** — aggregate documents from multiple sources.  
- ➜ **Five-stage AI pipeline** — OCR, normalisation, chunking, extraction, indexing.  
- ➜ **Priority classification** — auto-detect urgent directives and notify stakeholders.  
- ➜ **Bilingual UI** — English & Malayalam (localization ready).  
- ➜ **Fast vector search** — FAISS + Redis caching for sub-second retrieval.  
- ➜ **Role-based dashboards** — admin/user/department views with permissions.  
- ➜ **Audit logging** — full traceability for compliance and debugging.

---

## 🤸 Quick Start

### 1) Clone (copy-paste)
```bash
git clone https://github.com/BhishanSharma/KMRLSIH
cd KMRLSIH
```

### 2) Frontend (local dev) — copy-paste
```bash
# go to frontend
cd frontend

# install dependencies
npm install

# run dev server
npm run dev
# open http://localhost:5173
```

### 3) Backend (local dev) — copy-paste
```bash
# from project root
cd backend

# create virtual environment
python -m venv venv

# activate (Linux / macOS)
source venv/bin/activate

# activate (Windows PowerShell)
# .\venv\Scripts\Activate.ps1

# install backend dependencies
cd api
pip install --upgrade pip
pip install -r requirements.txt

# install nlp pipeline dependencies
cd ../nlpPipelne
pip install -r requirements.txt

# run backend (from backend/api)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
# backend available at http://localhost:8000
```

---

## 🧾 Environment Variables

Create `.env` in `backend/api/` with (copy-paste and replace placeholders):

```bash
cat > backend/api/.env <<'EOF'
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_KEY=your_supabase_service_role_key

DATABASE_URL=postgresql://kmrl_user:kmrl_pass@postgres:5432/kmrl_db

REACT_APP_EMAILJS_USERID=your_emailjs_user_id
REACT_APP_EMAILJS_TEMPLATEID=your_emailjs_template_id
REACT_APP_EMAILJS_RECEIVERID=your_emailjs_receiver_id

SECRET_KEY=changeme
REDIS_URL=redis://redis:6379/0
EOF
```

> ➜ **Security:** Never commit `.env`. Use a secrets manager for production.

---

## 🐳 Docker & NLTK / Tesseract Setup

If you prefer Docker (recommended for reproducible builds) — building the backend image will install Tesseract and download NLTK data at build time.

### Backend Dockerfile (copy into `backend/api/Dockerfile`)
```dockerfile
FROM python:3.11-slim

ENV POETRY_VIRTUALENVS_CREATE=false

# Install system deps and tesseract
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    curl \
    ca-certificates \
    libpq-dev \
    tesseract-ocr \
    tesseract-ocr-eng \
    tesseract-ocr-mal \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install
COPY api/requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

# Copy app code
COPY api /app

# NLTK downloads (one-time during build)
RUN python -m nltk.downloader punkt
RUN python -m nltk.downloader punkt_tab || true
RUN python -m nltk.downloader stopwords
RUN python -m nltk.downloader wordnet
RUN python -m nltk.downloader omw-1.4

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

> ➜ Note: `punkt_tab` may not exist in all NLTK releases; the `|| true` guard in the Docker build prevents build failure if it's unavailable.

### Docker Compose (copy into `docker-compose.yml`)
```yaml
version: '3.8'
services:
  frontend:
    build:
      context: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

  backend:
    build:
      context: ./backend/api
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_KEY=${SUPABASE_KEY}
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    restart: unless-stopped
    environment:
      POSTGRES_USER: kmrl_user
      POSTGRES_PASSWORD: kmrl_pass
      POSTGRES_DB: kmrl_db
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  db_data:
```

Build & run (copy-paste):
```bash
docker-compose up --build -d
docker-compose logs -f backend
```

---

## ⚙️ Tesseract (local / system install)

If you run locally (non-Docker) on Debian/Ubuntu (copy-paste):
```bash
sudo apt-get update
sudo apt-get install -y tesseract-ocr tesseract-ocr-eng tesseract-ocr-mal
```

On macOS use `brew install tesseract` and add language packs as needed.  
On Windows, download the installer from the Tesseract project releases.

---

## 🔁 API Examples — `/history` (Add & Fetch)

Below are ready-to-drop-in FastAPI route handlers that follow your logic: POST to insert, GET to fetch by `user_id`.

### `backend/api/app/routers/views.py` (copy into file)
```python
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/profile")
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

class HistoryCreateRequest(BaseModel):
    user_id: str
    url: str
    dept_name: str
    priority: str

@router.post("/history")
async def add_history(request: HistoryCreateRequest):
    try:
        response = supabase.table("views").insert({
            "user_id": request.user_id,
            "url": request.url,
            "dept_name": request.dept_name,
            "priority": request.priority
        }).execute()

        if response.data:
            return {"message": "History added successfully", "record": response.data[0]}
        raise HTTPException(status_code=400, detail="Failed to insert history")

    except Exception as e:
        print("Error inserting history:", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/history")
async def get_history(user_id: str = Query(..., description="User ID to fetch history for")):
    try:
        response = supabase.table("views").select("*").eq("user_id", user_id).execute()
        if not response.data:
            return {"message": "No history found"}
        return {"history": response.data}
    except Exception as e:
        print("Error fetching history:", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
```

### Test with curl (copy-paste)

Insert:
```bash
curl -X POST "http://localhost:8000/profile/history" \
 -H "Content-Type: application/json" \
 -d '{
    "user_id": "5aa31fbb-4472-4dbf-8974-9a2cf69b1067",
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/LibreOffice_Writer_6.3.png",
    "dept_name": "Engineering",
    "priority": "high"
 }'
```

Fetch:
```bash
curl "http://localhost:8000/profile/history?user_id=5aa31fbb-4472-4dbf-8974-9a2cf69b1067"
```

---

## 📂 Project Structure (high level)
```
KMRLSIH/
├─ frontend/
│  ├─ src/
│  │  ├─ api/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ context/
│  │  └─ locales/
│  ├─ package.json
│  └─ vite.config.js
├─ backend/
│  ├─ api/
│  │  ├─ app/
│  │  │  ├─ routers/
│  │  │  ├─ schemas/
│  │  │  ├─ utils/
│  │  │  └─ main.py
│  │  └─ requirements.txt
│  ├─ nlpPipelne/
│  │  ├─ stages/
│  │  ├─ processPipeline.py
│  │  └─ requirements.txt
│  └─ Dockerfile
├─ database/
│  ├─ Dockerfile
│  └─ init.sql
├─ docker-compose.yml
└─ README.md
```

---

## ✅ Notes & Recommendations

- ➜ **Password storage:** Never store plaintext. Use `bcrypt` (or similar) and store a `password_hash`.  
- ➜ **Supabase keys:** Use a server-side service role key and never expose it to the frontend. Use RLS for row-level security.  
- ➜ **NLTK downloads:** `punkt_tab` may not be available; keep a fallback or remove it if builds fail.  
- ➜ **Tesseract languages:** `tesseract-ocr-mal` may require additional traineddata; test OCR quality and add language data if needed.  
- ➜ **Production:** Use secrets manager, TLS, proper CORS, rate-limiting, logging, and CI/CD pipelines.

---
