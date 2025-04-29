# Drupal to React Migration Framework

This project is a simple framework designed to help migrate legacy **Drupal** site data into a modern **React + Node.js + MySQL** stack. The primary focus is on preserving core content like posts and user metadata, while removing the bloat of unused or deprecated Drupal structures.

## Purpose

To make it easier for individuals or developers managing old Drupal websites to:
- Extract content data (posts, users)
- Transform it into a cleaner, normalized schema
- Serve it via a modern REST API (Node.js + Express)
- Display it in a frontend React application with pagination and search

## Features

- 🔄 SQL migration script to move data from legacy Drupal tables to a new clean schema
- 🔐 Environment-secured MySQL connection
- 📦 Express API route to paginate posts (`GET /posts?page=1`)
- ⚛️ React frontend with forward/backward pagination
- ✅ Compatible with Drupal 7 data exports (tested on `node`, `field_revision_body`, `users`)

## Folder Structure

```
project-root/
├── backend/           # Node.js backend (Express + MySQL)
│   ├── .env           # DB credentials (excluded from git)
│   ├── server.js      # Express server setup
│   └── routes/
│       └── posts.js   # Route to fetch paginated post data
├── frontend/          # React app (not included in this repo yet)
├── db/                # SQL migration scripts and dumps
│   └── migrate_from_my_site_to_my_db.sql
└── README.md
```

## How It Works

1. Export your legacy Drupal database (e.g., `my_site`)
2. Run the provided SQL migration script to populate the new schema (`my_db`)
3. Use the Node backend to serve paginated post data
4. Build a React frontend to consume this API and render content

## Getting Started

1. Clone the repo
2. Set up your `.env` file inside `/backend/`:

```env
DB_HOST=localhost
DB_USER=youruser
DB_PASSWORD=yourpassword
DB_NAME=my_db
PORT=3001
```

3. Run the backend:
```bash
cd backend
npm install
node server.js
```

4. Run the frontend:
```bash
cd frontend
npm run dev
```

5. Hit `http://localhost:<port>` to test

## Future Plans

- Add CLI or one-click migration script
- Expand to support more Drupal fields (tags, comments, media)
- Sanitize or convert HTML content to Markdown
- Add JWT auth and admin dashboard

## License
MIT

---

Built by a dev who got tired of fighting with old Drupal backends 😄

