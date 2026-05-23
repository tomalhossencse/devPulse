# DevPulse API

A backend issue tracking system built with Node.js, Express, TypeScript, and PostgreSQL. DevPulse allows users to create, manage, update, and track software issues such as bugs and feature requests with role-based access control.

---

# 🚀 Live URL

https://devpulsebd.vercel.app

---

# ✨ Features

- User authentication with JWT
- Role-based authorization (Contributor / Maintainer)
- Create, update, delete issues
- Partial updates using PATCH logic
- Filter & sort issues (type, status, date)
- Centralized error handling middleware
- PostgreSQL (Neon Serverless) database integration
- Secure password hashing with bcrypt
- RESTful API architecture

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL (Neon Serverless)

## Security & Auth

- JWT (JSON Web Token)
- bcrypt
- cookie-parser
- cors

## Dev Tools

- tsx
- tsup
- dotenv

---

# 📦 Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/tomalhossencse/devPulse
```

## 2. Install Dependencies

```bash
cd devPulse && npm install
```

## 3. Create .env File

```env
PORT=3000
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_jwt_secret
```

## 4. Run Development Server

```bash
npm run dev
```

## 5. Build Project

```bash
npm run build
```

## 6. Start Production Server

```bash
npm start
```

---

# 📁 Project Structure

```
src/
├── app.ts
├── index.ts
├── db/
├── middlewares/
├── modules/
│   ├── auth/
│   └── issue/
├── types/
└── utils/
```

---

# 🔐 Authentication

JWT-based authentication is used.

Send token in request header:

```
Authorization: Bearer <token>
```

---

# 📌 API Endpoints

## Auth Routes

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | /api/auth/signup | Register user |
| POST   | /api/auth/login  | Login user    |

## Issue Routes

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| POST   | /api/issues     | Create issue     |
| GET    | /api/issues     | Get all issues   |
| GET    | /api/issues/:id | Get single issue |
| PATCH  | /api/issues/:id | Update issue     |
| DELETE | /api/issues/:id | Delete issue     |

---

# 🔎 Query Parameters

Example:

```
GET /api/issues?sort=newest&type=bug&status=open
```

| Param  | Values                      |
| ------ | --------------------------- |
| sort   | newest, oldest              |
| type   | bug, feature_request        |
| status | open, in_progress, resolved |

---

# 🗄 Database Schema

## Users

- id (SERIAL PRIMARY KEY)
- name (VARCHAR 100)
- email (VARCHAR 255 UNIQUE)
- password (TEXT)
- role (contributor | maintainer)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

## Issues

- id (SERIAL PRIMARY KEY)
- title (VARCHAR 150)
- description (TEXT)
- type (bug | feature_request)
- status (open | in_progress | resolved)
- reporter_id (INT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
