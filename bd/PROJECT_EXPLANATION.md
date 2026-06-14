# Ink Junction Tattoo Studio - Backend Documentation

## Project Overview
The backend provides a RESTful API, Socket.IO real-time synchronization, and media upload capabilities for the Ink Junction Tattoo Studio.

## Technology Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Real-time**: Socket.IO
- **Media Handling**: Multer
- **Database**: PostgreSQL (via Prisma ORM)
- **Middleware**: CORS, Dotenv

## Architecture & How It Works

### 1. Server Entry Point (`src/index.js`)
- Initializes Express and an HTTP Server.
- Configures Socket.IO with CORS for real-time broadcasts.
- Serves static images from the `/img` directory.
- Connects to PostgreSQL via the Prisma `connectDB` helper.
- Attaches the Socket.IO instance to every request (`req.io`).

### 2. Database (Prisma Schema — `prisma/schema.prisma`)
- **Portfolio**: Fields for `type` (image/video), `src`, `beforeSrc` (for coverup tattoos), `style`, and `caption`.
- **Content**: Key-value store for global site settings (hero title, artist bio, media URLs, etc.).
- **Offer**: Fields for `title`, `description`, `type`, `src`, `isActive`, and optional `expiresAt`.

### 3. API Routes
- **/api/portfolio**: CRUD operations for tattoo portfolio items. Emits `portfolioUpdated` socket events on changes.
- **/api/content**: Upsert key-value store for site content. Emits `contentUpdated` socket events on updates.
- **/api/offers**: CRUD for promotional offers with optional expiry. Emits `offersUpdated` socket events.
- **/api/upload**: Multer endpoint for uploading media files to the server filesystem (`src/img/1/`).
- **/api/health**: Basic health check endpoint.

### 4. Data Seeding (`src/seed.js`)
- Utility script to populate the database with the initial portfolio images and videos stored in `src/img/1/`.
- Run with: `npm run seed`

## Connectivity & Flow
1. **Real-time Broadcast**: When the owner updates content via the Admin Panel, the server saves to PostgreSQL and immediately broadcasts to all connected clients via Socket.IO.
2. **Media Upload**: Files are received by Multer, stored in `src/img/1/`, and the URL path is returned to the frontend.
3. **Static Assets**: The frontend renders images using paths like `http://localhost:5000/img/1/filename.jpg`.

## Environment Setup
Copy `.env.example` to `.env` and fill in your values:
- `DATABASE_URL` — PostgreSQL connection string (supports Prisma Data Proxy / pooled connections)
- `PORT` — defaults to 5000
- `FRONTEND_URL` — used for CORS configuration

## Database Setup
```bash
# Install dependencies
npm install

# Push schema to database (first time setup)
npm run prisma:push

# Or run migrations
npm run prisma:migrate

# Seed initial data
npm run seed
```

## Reliability
- **Environment Management**: Uses `.env` for database URIs and port configuration.
- **Error Handling**: Graceful error catching in all routes to prevent server crashes.
- **Socket Heartbeat**: Maintains active connections with clients for instant synchronization.
