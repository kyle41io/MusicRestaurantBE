# Music Restaurant Backend

Express + TypeScript backend for Music Restaurant.

- Production backend: `https://music-restaurant-be.vercel.app`
- Frontend: `https://music-restaurant-fe.vercel.app`
- Local backend: `http://localhost:3001`
- Local API docs: `http://localhost:3001/api-docs`
- Local frontend: `http://localhost:3000`

## Local Requirements

- Node.js
- npm
- Docker Desktop
- Docker Compose

The backend requires Postgres. `npm run dev` alone is not enough unless Postgres is already running and `.env` is configured.

## Environment

Create/update `.env` in this folder:

```env
ENVIROMENT=DEV
PORT=3001

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=music_restaurant
POSTGRES_PORT=5432
POSTGRES_LOCAL=localhost
POSTGRES_HOST=localhost

PASSWORD_KEY=local_dev_password_key_change_me
YOUTUBE_API_KEY=optional_youtube_data_api_key
DOWNLOAD_MUSIC=
```

Notes:
- The variable name is currently spelled `ENVIROMENT` in code.
- `PASSWORD_KEY` is required for password hashing and JWT signing.
- `YOUTUBE_API_KEY` is optional but recommended for YouTube search. Without it, the backend falls back to the existing no-key search package.
- `DOWNLOAD_MUSIC` was used by the old YouTube-to-MP3 service. That flow is not production-ready.
- Do not commit real secrets.

## First-Time Local Setup

Install dependencies:

```bash
npm ci
```

Start Postgres:

```bash
docker compose up -d db
```

Check Postgres is running:

```bash
docker compose ps
```

Expected: `postgres_con` is `Up` and exposes port `5432`.

Start the backend:

```bash
npm run dev
```

Expected logs:

```text
PORT 3001 is listening
Connected -duh
```

Health check:

```bash
curl http://localhost:3001/health
```

Expected:

```json
{"status":"ok"}
```

API docs:

```text
http://localhost:3001
```

The backend root redirects to `/api-docs`.

## Run Both Projects Locally

Terminal 1:

```bash
cd MusicRestaurantBE
docker compose up -d db
npm run dev
```

Terminal 2:

```bash
cd MusicRestaurantFE
npm run dev
```

Open:

```text
http://localhost:3000
```

## Useful API Checks

Sign up a local test user:

```bash
curl -X POST http://localhost:3001/api/auth/new \
  -H 'Content-Type: application/json' \
  -d '{"name":"Local Test User","username":"localtest01","password":"Password1!"}'
```

`image` is optional. If omitted, the backend stores a default avatar URL.

Sign in:

```bash
curl -X POST http://localhost:3001/api/auth \
  -H 'Content-Type: application/json' \
  -d '{"username":"localtest01","password":"Password1!"}'
```

Search music candidates:

```bash
curl 'http://localhost:3001/api/musics?search=hello&page=1'
```

List playlists:

```bash
curl 'http://localhost:3001/api/playlists?page=1&sort=DESC'
```

## Scripts

```bash
npm run dev
npm run build
npm run start
```

- `npm run dev`: starts the local TypeScript server on port `3001`.
- `npm run build`: compiles TypeScript to `dist`.
- `npm run start`: runs the compiled app.

## Common Problems

### Backend starts but APIs return database errors

Postgres is not running or `.env` does not match Docker.

Fix:

```bash
docker compose up -d db
docker compose ps
npm run dev
```

### `ECONNREFUSED 127.0.0.1:5432`

The backend cannot connect to Postgres.

Check:
- Docker Desktop is running.
- `docker compose ps` shows `postgres_con` as `Up`.
- `.env` has `POSTGRES_LOCAL=localhost` and `POSTGRES_PORT=5432`.

### Frontend cannot call backend

Check frontend `.env`:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

Then restart the frontend dev server.

### Firebase Storage returns `402 Payment Required`

This is a Firebase Storage project/billing/quota problem, not a backend auth problem. The frontend now treats avatar upload as optional, so sign up should still work even if Firebase upload fails.

Long term, choose one image storage provider and configure it in production. Cloudinary is a good simple option for avatar images; Firebase Storage, S3, or R2 are also fine.

### YouTube song search works but playback does not

The app now saves selected YouTube songs with metadata and plays them through an embedded YouTube player on the playlist detail page.

The old MP3 conversion flow is still not recommended. It requires converting/downloading the song first, and `/api/streams/:songId` can still return:

```json
{"message":"Download the song first"}
```

The old conversion design uses a third-party YouTube-to-MP3 service and local files. That is not reliable on Vercel serverless because local files are not persistent. It also needs a product/legal decision before production.

Recommended next choices:
- Store YouTube ids and play through an allowed YouTube playback experience.
- Let users upload owned/licensed audio files to Firebase Storage/S3/R2.
- Use a background worker plus durable storage only for audio the app is allowed to process.

## Current Working Local Flows

- Health check
- Sign up
- Sign in
- User list/profile read
- YouTube candidate search
- Playlist create/read/list
- Empty comment/like list responses

## API Contract

The frontend contract is documented in:

```text
../MusicRestaurantFE/API_CONTRACT.md
```
