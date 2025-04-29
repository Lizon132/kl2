# KL2 Backend (Node.js + Express)

This is the backend of the KL2 project, which exposes a secure REST API for managing blog posts, user authentication, and content editing.

---

## 🚀 Features

- Express-based REST API
- MySQL database connection (via `mysql2`)
- JWT-based authentication
- Paginated posts API
- Edit/update support for post content
- `.env` protected config

---

## 📁 Folder Structure

```
backend/
├── routes/         # API endpoints (posts.js, auth.js)
├── scripts/        # One-time scripts for migration/fixes (Git-ignored)
├── db.js           # MySQL connection setup
├── server.js       # Main entry point
└── .env            # Environment config (not tracked)
```

---

## 🛠️ Getting Started

1. From project root:
```bash
cd backend
npm install
```

2. Create a `.env` file:
```env
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=kl
JWT_SECRET=some_super_secret_value
```

3. Start dev server:
```bash
npm run dev
```

API runs at: `http://localhost:3001`

---

## 🔐 Authentication

- `/auth/login` accepts POST with `username` and `password`
- Returns a signed JWT if credentials are valid
- JWT required in `Authorization` header for protected routes

---

## 🔁 Core Routes

- `GET /posts?page=X` – Paginated posts
- `GET /posts/:id` – Get specific post
- `PUT /posts/:id` – Update post content (auth required)

---

## 🧾 Notes

- Protects against SQL injection using prepared statements
- Routes expect JSON bodies
- Works with the frontend using Vite's proxy config

---

## 📌 TODO (Backend)

- Add user roles/permissions
- Create media/file upload route
- Refactor SQL into separate model/controller files
- Add full CRUD for users/posts

---

## 🙌 Credit

Built using Node.js, Express, MySQL

