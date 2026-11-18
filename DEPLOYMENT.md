# 🚀 Chic N Co. — Complete Production Deployment Guide

This guide walks you through deploying the **Chic N Co.** luxury fashion e-commerce application to production:
- **Frontend**: [Cloudflare Pages](https://pages.cloudflare.com/) (Ultra-fast edge delivery)
- **Backend API**: [Render](https://render.com/) (Node.js & Express web service)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) (Managed Cloud NoSQL cluster)

---

## 📋 Architectural Overview

```
 [ Client Browser ]
        │
        ├─────────────────────────────┐
        ▼                             ▼
[ Cloudflare Pages ]           [ Render Web Service ]
  React + Vite SPA               Node.js + Express API
  (chic-n-co.pages.dev)         (chic-n-co-backend.onrender.com)
                                      │
                                      ▼
                             [ MongoDB Atlas ]
                               Cluster (chic_n_co_fashion)
```

---

## 1. 🗄️ Database Setup (MongoDB Atlas)

1. Log into your [MongoDB Atlas](https://cloud.mongodb.com/) dashboard.
2. Create a new cluster (Free Shared tier `M0` or dedicated `M10+`).
3. Under **Database Access**:
   - Create a database user (e.g. `chicnco_admin`).
   - Assign **Read and write to any database** privileges.
4. Under **Network Access**:
   - Add `0.0.0.0/0` (Allow access from anywhere) so Render can reach the cluster.
5. In **Clusters** → click **Connect** → **Drivers** (Node.js):
   - Copy the connection URI:
     ```
     mongodb+srv://<username>:<password>@<cluster-address>.mongodb.net/chic_n_co_fashion?retryWrites=true&w=majority
     ```
6. (Optional) Run the seed script to preload the atelier collection:
   ```bash
   cd backend
   npm run seed
   ```

---

## 2. 🖥️ Backend Deployment on Render

1. Log in to [Render](https://dashboard.render.com).
2. Click **New +** → **Web Service**.
3. Connect your Git repository.
4. Configure the service settings:
   - **Name**: `chic-n-co-backend`
   - **Region**: Closest to your target audience (e.g., *Oregon (US West)* or *Frankfurt (EU)*)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free` or `Starter`
5. In the **Environment Variables** section, add:
   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Production mode |
   | `PORT` | `10000` | Port provided by Render (or leave default) |
   | `MONGODB_URI` | `mongodb+srv://...` | Your Atlas MongoDB URI |
   | `JWT_SECRET` | *(Secure 32+ char string)* | Token encryption key |
   | `JWT_EXPIRE` | `30d` | Token lifetime |
   | `FRONTEND_URL` | `https://chic-n-co.pages.dev` | Your Cloudflare Pages URL |

6. Click **Create Web Service**.
7. Once deployed, note down your Render service URL (e.g. `https://chic-n-co-backend.onrender.com`).

---

## 3. 🌐 Frontend Deployment on Cloudflare Pages

### Option A: Via Cloudflare Dashboard (Recommended)

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the sidebar, navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select your repository.
4. In **Set up builds and deployments**:
   - **Project name**: `chic-n-co`
   - **Production branch**: `main`
   - **Framework preset**: `Vite`
   - **Root directory**: `frontend`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Under **Environment variables (Advanced)**:
   | Variable name | Value |
   | :--- | :--- |
   | `VITE_API_URL` | `https://chic-n-co-backend.onrender.com/api` |
   | `NODE_VERSION` | `20.18.0` |

6. Click **Save and Deploy**.
7. Cloudflare Pages will build and deploy your site to `https://chic-n-co.pages.dev`.

### SPA Routing Note:
The file `frontend/public/_redirects` is already included:
```
/* /index.html 200
```
This ensures seamless client-side routing on Cloudflare Pages for all deep URLs (`/product/:id`, `/checkout`, `/about`, etc.).

---

## 4. 🔗 Linking Frontend & Backend (CORS & Connectivity)

1. Open your **Render** backend environment variables.
2. Update `FRONTEND_URL` to match your actual Cloudflare Pages production domain:
   ```env
   FRONTEND_URL=https://chic-n-co.pages.dev
   ```
3. Trigger a redeploy on Render.
4. Open `https://chic-n-co.pages.dev` in your browser:
   - Check the network tab: All API requests to `https://chic-n-co-backend.onrender.com/api/...` will succeed with HTTP `200`.
   - Test adding garments to bag, applying code `CHIC15`, and completing an order.

---

## 5. 🛠️ Local Development & Testing

To run both services locally on your development machine:

### Backend:
```bash
cd backend
npm install
npm run dev
# Server will start on http://localhost:5000
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
# Vite dev server will start on http://localhost:5173
```

