# Task Manager API

A Node.js + Express + MongoDB backend for a task management application with:

- User registration & login (JWT)
- CRUD for tasks
- Categorization & deadlines
- User-specific data isolation
- Optional: email notifications + password reset flow

## Tech Stack
- Node.js, Express
- MongoDB with Mongoose
- JWT for auth, bcrypt for hashing
- Nodemailer (optional email)

## Getting Started

### 1) Clone & Install
```bash
npm install
```

### 2) Configure Environment
Copy `.env.example` to `.env` and set values:
- `MONGODB_URI` — your MongoDB connection string
- `JWT_SECRET` — long random string
- Mail settings (optional). If omitted, emails are logged to console.

### 3) Run
```bash
npm run dev
# or
npm start
```

The API listens on `http://localhost:5000` by default.

## API Overview

### Auth
- `POST /api/auth/register` — { name, email, password }
- `POST /api/auth/login` — { email, password }
- `POST /api/auth/forgot-password` — { email }
- `POST /api/auth/reset-password` — { token, password }

All task & category endpoints require `Authorization: Bearer <token>`.

### Categories
- `GET /api/categories` — list my categories
- `POST /api/categories` — { name, color? }
- `DELETE /api/categories/:id`

### Tasks
- `GET /api/tasks?completed=true|false&category=<id>&search=keyword&sort=createdAt|dueDate`
- `POST /api/tasks` — { title, description?, dueDate?, category?, priority? }
- `GET /api/tasks/:id`
- `PATCH /api/tasks/:id` — any updatable fields
- `DELETE /api/tasks/:id`
- `PATCH /api/tasks/:id/complete` — toggle completed

## Notes
- Users can only access their own categories and tasks.
- `dueDate` must be ISO8601 (e.g., `2025-08-28T12:00:00.000Z`).
- Add rate limiting, refresh tokens, and Swagger docs if needed.

## Password Reset Flow (Optional)
1. User sends email to `/api/auth/forgot-password`.
2. System generates a temporary token (30 min expiry) and emails it.
3. User calls `/api/auth/reset-password` with `{ token, password }`.

## Email Notifications (Optional)
Hook into task lifecycle (create/update) to send reminders before `dueDate`. A simple cron worker can query upcoming tasks and email users.
