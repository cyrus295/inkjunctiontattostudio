# Ink Junction — Deployment Guide

## What Was Done (Code Changes)

| File | Change |
|------|--------|
| `bd/src/index.js` | Production CORS — only allows `FRONTEND_URL` + localhost |
| `bd/src/config/cloudinary.js` | New — Cloudinary config + multer storage |
| `bd/src/routes/upload.js` | Auto-switches: Cloudinary in prod, local disk in dev |
| `bd/package.json` | Build script now runs `prisma generate` |
| `bd/.env.example` | Updated with all required production vars |
| `bd/.gitignore` | New — excludes .env and uploaded media |
| `fd/vite.config.js` | Added production build config + chunk splitting |
| `fd/vercel.json` | New — fixes page refresh routing on Vercel |
| `fd/.gitignore` | Added .env and dist/ |
| `.gitignore` | New root monorepo gitignore |

---

## Step 1 — Get a Cloudinary Account (Free)

1. Go to **https://cloudinary.com** → Sign Up Free
2. After login, go to the **Dashboard**
3. Copy your:
   - **Cloud name**
   - **API Key**
   - **API Secret**

You'll need these in Step 3.

---

## Step 2 — Push to GitHub

Open a terminal in the `INKJUNCTION` folder:

```bash
git init
git add .
git commit -m "Initial commit — Ink Junction Tattoo Studio"
```

Then:
1. Go to **https://github.com** → New repository → name it `inkjunction`
2. Copy the remote URL it gives you (looks like `https://github.com/yourname/inkjunction.git`)
3. Run:
```bash
git remote add origin https://github.com/yourname/inkjunction.git
git branch -M main
git push -u origin main
```

---

## Step 3 — Deploy Backend on Render

1. Go to **https://render.com** → Sign in with GitHub → **New → Web Service**
2. Select your `inkjunction` repo
3. Configure:
   - **Name**: `inkjunction-api`
   - **Root Directory**: `bd`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. Click **Advanced** → **Add Environment Variables** — add all of these:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `DATABASE_URL` | *(your existing prisma DB URL from bd/.env)* |
| `FRONTEND_URL` | `https://inkjunction.vercel.app` *(update after Step 4)* |
| `CLOUDINARY_CLOUD_NAME` | *(from Step 1)* |
| `CLOUDINARY_API_KEY` | *(from Step 1)* |
| `CLOUDINARY_API_SECRET` | *(from Step 1)* |

5. Click **Create Web Service** — Render will build and deploy.
6. Wait ~2 minutes → you get a URL like:  
   **`https://inkjunction-api.onrender.com`**

### Verify backend is live:
Open in browser:  
`https://inkjunction-api.onrender.com/api/health`  
You should see:
```json
{ "status": "ok", "message": "Ink Junction API is running", "cloudinary": true }
```

---

## Step 4 — Deploy Frontend on Vercel

1. Go to **https://vercel.com** → Sign in with GitHub → **Add New Project**
2. Import your `inkjunction` repo
3. Configure:
   - **Root Directory**: `fd`
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Click **Environment Variables** → Add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://inkjunction-api.onrender.com/api` |
| `VITE_ADMIN_PASSKEY` | *(choose a strong password, not admin123)* |

5. Click **Deploy** — takes ~1 minute.
6. You get a URL like:  
   **`https://inkjunction.vercel.app`**

---

## Step 5 — Update CORS on Render

Now that you have your Vercel URL:

1. Go to Render → Your Web Service → **Environment**
2. Update `FRONTEND_URL` to your actual Vercel URL:  
   `https://inkjunction.vercel.app`
3. Render auto-redeploys with the new value.

---

## How to Use After Deployment

### View the live site
```
https://inkjunction.vercel.app
```

### Access the Admin Panel
```
https://inkjunction.vercel.app/admin
```
Enter the `VITE_ADMIN_PASSKEY` you set in Vercel.

### From the Admin Panel you can:
- **Portfolio tab** — Add/edit/delete tattoo photos & videos (uploaded to Cloudinary)
- **Media Hub tab** — Set hero video, studio environment clips, artist photo
- **Active Offers tab** — Create/manage promotional offers with expiry timers

### Check backend health
```
https://inkjunction-api.onrender.com/api/health
```

---

## Updating the Site Later

Whenever you push changes to GitHub:
- **Vercel** auto-redeploys the frontend
- **Render** auto-redeploys the backend

No manual steps needed.

---

## Free Tier Limits to Know

| Service | Free Limit | Note |
|---------|-----------|------|
| Render | 750 hrs/month | Spins down after 15 min inactivity — first request takes ~30s |
| Vercel | 100GB bandwidth | More than enough |
| Cloudinary | 25 credits/month | ~10,000 image transformations |
| Prisma DB | Already paid/configured | No change |

### Fix Render slow cold start (optional)
Render free tier sleeps after inactivity. To keep it awake, use a free service like **https://uptimerobot.com** — create a monitor that pings `https://inkjunction-api.onrender.com/api/health` every 5 minutes.

---

## Local Development (unchanged)

```bash
# Terminal 1 — Backend
cd bd
npm run dev

# Terminal 2 — Frontend  
cd fd
npm run dev
```

Frontend: http://localhost:5173  
Admin: http://localhost:5173/admin  
Backend: http://localhost:5000/api/health


_______________________________________________________________________________________________________________

I can't do that part for you — deploying to Render, Vercel, and Cloudinary requires you to log in to those websites with your own account. I don't have access to your browser or those platforms.

But here's exactly what to do, step by step — it takes about 10 minutes:

---

## Step 1 — Cloudinary (2 min)

1. Open **https://cloudinary.com** → click **Sign Up Free**
2. After login → you're on the Dashboard
3. Copy these 3 values:
   - **Cloud name**
-   - **API Secret**

Keep them open, you'll need them in Step 2.

---

## Step 2 — Render for Backend (4 min)

1. Open **https://render.com** → **Sign in with GitHub**
2. Click **New → Web Service**
3. Select repo: `cyrus295/inkjunctiontattostudio`
4. Fill in:
   - **Root Directory**: `bd`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click **Add Environment Variables** and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | *(copy from bd/.env)* |
| `FRONTEND_URL` | `https://inkjunctiontattostudio.vercel.app` |
| `CLOUDINARY_CLOUD_NAME` | *(from Step 1)* |
| `CLOUDINARY_API_KEY` | *(from Step 1)* |
| `CLOUDINARY_API_SECRET` | *(from Step 1)* |

6. Click **Create Web Service** → wait ~2 min
7. Copy the URL it gives you (like `https://inkjunctiontattostudio.onrender.com`)

---

## Step 3 — Vercel for Frontend (3 min)

1. Open **https://vercel.com** → **Sign in with GitHub**
2. Click **Add New Project** → import `cyrus295/inkjunctiontattostudio`
3. Set **Root Directory** to `fd`
4. Add Environment Variables:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://inkjunctiontattostudio.onrender.com/api` *(your Render URL + /api)* |
| `VITE_ADMIN_PASSKEY` | choose a strong password |

5. Click **Deploy** → done in ~1 min

---

Once both are deployed, share the URLs with me and I'll verify everything is working correctly.
