# Pixel38 CMS — Backend

REST API for a Content Management System powering a wood products/services website — built with **NestJS**, **PostgreSQL**, and **Prisma ORM**, as part of the Pixel38 Full Stack Developer Technical Assessment.

- **Frontend repository:** https://github.com/MostafaNassar1/pixel38-frontend
- **Backend repository:**: https://github.com/MostafaNassar1/pixel38-backend
- **Deployed frontend:** https://pixel38-frontend-o3tecj1rs-mostafanassar1s-projects.vercel.app/
- **Backend deployment:** Not deployed — below details and instructions to run locally.

## Admin Login Credentials

```
Email:    admin@pixel38.com
Password: Admin123
```

---

## Tech Stack

- **Framework:** NestJS (REST API)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT (access + refresh tokens), bcrypt password hashing, httpOnly cookies
- **Docs:** Swagger 
- **File uploads:** Multer (local disk storage, served as static files)

---

## 1. Setup Instructions

### Prerequisites
- Node.js v18+
- PostgreSQL installed and running locally (or a hosted Postgres instance, e.g. [Neon](https://neon.tech))

### Install and run

```bash
git clone https://github.com/MostafaNassar1/pixel38-backend.git
cd pixel38-backend
npm install
```

Create your `.env` file (see [Environment Variables](#2-environment-variables) below).

Run database migrations:

```bash
npx prisma migrate dev
```

Seed the admin user:

```bash
npx prisma db seed
```

Start the dev server:

```bash
npm run start:dev
```

The API will be running at `http://localhost:3000`, prefixed with `/api` (e.g. `http://localhost:3000/api/public/products`).

### API Documentation (Swagger)

Once the server is running, interactive API docs — every endpoint, request/response schemas, and example payloads — are available at:

```
http://localhost:3000/api/docs
```

To test protected (admin) endpoints directly from Swagger: log in via `POST /api/auth/login` in the docs UI, copy the returned `accessToken`, click the **Authorize** button (top right), and paste the token in.

Full API reference with request/response examples: [API.md](./API.md)

Postman collection: https://mostafa-nassar829-6663953.postman.co/workspace/Mostafa-Nassar's-Workspace~f3fe9e71-70f9-446c-87af-e74515d88729/folder/53043788-ff616ad1-2f36-47af-aea2-1a52fcdba760?action=share&source=copy-link&creator=53043788

---

## 2. Environment Variables

Create a `.env` file in the project root with the following:

```env
DATABASE_URL="postgresql://postgres:postegres123@localhost:5432/pixel38_cms?schema=public"

JWT_ACCESS_SECRET="a-long-random-secret-string"
JWT_REFRESH_SECRET="a-different-long-random-secret-string"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"

```

## 3. Database Setup

1. Install PostgreSQL and create a database:
   ```sql
   CREATE DATABASE pixel38_cms;
   ```
2. Set `DATABASE_URL` in `.env` to point at it.
3. Run migrations to create all tables:
   ```bash
   npx prisma migrate dev
   ```
4. Seed the initial admin user:
   ```bash
   npx prisma db seed
   ```
   This creates `admin@pixel38.com` / `Admin123` (editable in `prisma/seed.ts` before running).

### Schema overview

| Table | Purpose |
|---|---|
| `users` | Admin accounts. Stores bcrypt-hashed passwords and a bcrypt-hashed refresh token for session invalidation on logout. |
| `homepage_content` | Flexible CMS blocks (hero, banner, text sections) for the homepage, distinguished by a `section` field. Includes a `content: Json` field for freeform structured data. |
| `services` | Company services shown on the public site. |
| `products` | Wood types/products, including a `traits: Json` field for the pros/cons checklist (e.g. Durability ✓, Expensive ✗) shown per wood type. |
| `product_images` | Multiple images per product, with an `order` field for drag-and-drop reordering, cascade-deleted with their parent product. |

Prisma migration history lives in `prisma/migrations/` and is included in this repository.

---

## 4. Architecture Overview

```
src/
├── auth/          # Login, JWT strategies (access + refresh), guards, bcrypt logic
├── homepage/       # Public + admin controllers for homepage content sections
├── services/        # Public + admin controllers for services CRUD
├── products/         # Public + admin controllers for products CRUD + image sub-resources
├── upload/            # Multer-based file upload endpoint
├── prisma.service.ts   # Shared, injectable Prisma client (single connection pool)
├── app.module.ts
└── main.ts              # Global prefix, CORS, validation pipe, Swagger, static file serving
```

**Architectural Overview:**

Public and admin routes are deliberately separated per resource (e.g. `PublicServicesController` / `AdminServicesController` sharing one underlying service), keeping route-level security explicit without duplicating business logic. Authentication uses two separate JWT secrets and Passport strategies — short-lived access tokens (15 min) sent via the `Authorization` header, and long-lived refresh tokens (7 days) stored only in an httpOnly cookie so they're never exposed to frontend JavaScript; refresh tokens are also bcrypt-hashed before being stored, so logout can invalidate a session server-side rather than merely client-side. Homepage content uses a single flexible table with a `content: Json` field rather than one table per section, letting `PUT /api/admin/homepage` upsert an arbitrary array of sections (hero, banners, text blocks) in one request — matching how a real CMS "Save" action works. A global `ValidationPipe` (whitelist, forbid-unknown-properties, auto-transform) validates every request against `class-validator`-decorated DTOs, which also drive the Swagger documentation automatically.

---

## 5. Deployment Status

The frontend is deployed and live on Vercel (link above). **The backend is not currently deployed**.

**As a result:** the deployed frontend's dynamic pages (which call the live API) will not function correctly, since there is no reachable backend URL. The admin dashboard and dynamic content require running the backend locally per the setup instructions above, with the frontend's `NEXT_PUBLIC_API_URL` pointed at `http://localhost:3000/api`.

The database itself **is** live on [Neon](https://neon.tech) with all migrations applied and the admin user seeded.

---

## 6. AI Tools Used

Claude AI was used as an assistant throughout this project.

## 7. Time Spent

Approximately **1–2 days**, covering: backend setup and full CRUD + auth implementation and testing (Postman + Swagger), frontend scaffolding and Figma-based UI implementation (desktop + mobile), admin dashboard (auth flow, Services/Products/Homepage management with image upload), and deployment (frontend successful, backend attempted).
