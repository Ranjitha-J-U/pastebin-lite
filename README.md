# Pastebin Lite

Pastebin Lite is a simple Pastebin-like web application that allows users to create and share text pastes using a unique URL.  
Pastes can optionally expire based on time (TTL) or a maximum number of views.

---

## Features
- Create and share text pastes
- Optional time-based expiry (TTL)
- Optional view-count limits
- Pastes become unavailable once constraints are exceeded
- Safe rendering of paste content

---

## Tech Stack
- **Frontend & Backend:** Next.js (Node.js)
- **Persistence Layer:** Upstash Redis
- **Deployment:** Vercel

---

## API Endpoints
- `GET /api/healthz` – Health check
- `POST /api/pastes` – Create a paste
- `GET /api/pastes/:id` – Fetch a paste (API)
- `GET /p/:id` – View a paste (HTML)

---

## Running Locally

```bash
git clone https://github.com/Ranjitha-J-U/pastebin-lite
cd pastebin-lite
npm install
npm run dev

Create a .env.local file:

UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
BASE_URL=http://localhost:3000
TEST_MODE=0