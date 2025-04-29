# KL2 Frontend (React + Vite)

This is the frontend of the KL2 project, a modern React-based interface built to replace a legacy Drupal site.

---

## 🚀 Features

- Vite-powered React app
- TipTap editor for WYSIWYG post editing
- Bootstrap 5 styling
- Paginated post viewer (10 per page)
- Login page using JWT auth
- Protected editor dashboard
- Embedded YouTube and Google Maps support via clean links

---

## 📁 Folder Structure

```
frontend/
├── public/
│   └── uploads/       # Uploaded image files (Git-ignored)
├── src/
│   ├── components/    # Reusable UI components like Navbar
│   ├── pages/         # React pages (Home, Posts, Editor, Login)
│   ├── App.jsx        # Top-level routing
│   └── main.jsx       # Vite app entry
└── index.html         # Vite HTML entry
```

---

## 🛠️ Getting Started

1. From project root:
```bash
cd frontend
npm install
```

2. Start dev server:
```bash
npm run dev
```

3. Open in browser:
```
http://localhost:5173
```

---

## 🔐 Auth & API

- Auth and post routes are proxied to the backend (`localhost:3001`) via Vite's proxy config.
- Auth state is stored in localStorage using a JWT.
- The editor view is protected and only accessible after login.

---

## 🧾 Notes

- Uploads folder is ignored by Git
- YouTube and Maps embeds are rendered client-side (not stored as iframes)
- Content is stored in HTML in the database, but shown as formatted text or editable blocks

---

## 📌 TODO (Frontend)

- Add post search or filter
- Add image upload widget
- Refine mobile responsiveness
- Polish dashboard styling

---

## 🙌 Credit

Built using React, Vite, TipTap, Bootstrap

