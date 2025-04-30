# KL2: Legacy Drupal Migration to React + Node.js

This project migrates legacy content from a Drupal 7 website into a modern stack using:

- ✅ MySQL backend
- ✅ Node.js (Express) API server
- ✅ React + Vite frontend
- ✅ TipTap editor with rich content + source view
- ✅ Clean embed handling for YouTube and Google Maps

---

## 🚀 Features

- Migrate posts from Drupal 7 to a simplified MySQL database
- Admin login system with JWT authentication
- Paginated post listing (10 per page)
- WYSIWYG editor with TipTap + raw HTML editing
- ✨ Insert [preview-break] marker for post previews
- 📺 Embed YouTube by pasting URL or using iframe in source view
- 🗺 Embed Google Maps using the embed URL (auto-wrapped in iframe)
- Dashboard page with post stats and quick links
- Modern Bootstrap 5 UI styling
- Secure `.env` configuration (no hardcoded credentials)

---

## ⚙️ Project Structure

```
kl2/
├── backend/            # Express API server
│   ├── routes/         # auth.js, posts.js
│   ├── scripts/        # (ignored by Git) custom migration tools
│   └── .env            # MySQL credentials, JWT secret
├── frontend/           # React frontend (Vite based)
│   ├── src/
│   │   ├── pages/      # PostsPage, FullPostPage, EditorPage, LoginPage, DashboardPage
│   │   ├── components/ # Navbar, etc.
│   └── public/uploads/ # Uploaded images (ignored by Git)
├── db/                 # Database .sql migration files
├── README.md           # Root documentation
└── package.json        # Project metadata
```

---

## 📦 Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/yourusername/kl2.git
cd kl2
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Setup your backend `.env`**
```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_password
DB_NAME=kl
JWT_SECRET=your_secret_key_here
```

5. **Run servers**
```bash
# Backend
cd backend
node server.js

# Frontend (Vite)
cd ../frontend
npm run dev
```

---

## ✨ Editor Details

- TipTap supports inline image, link, and YouTube embedding
- Source view (`<textarea>`) lets you fully edit raw HTML
- `[preview-break]` tag defines cutoff point for homepage preview
- All raw `https://www.google.com/maps/embed?...` URLs are auto-wrapped into `<iframe>`

---

## 🛡 Security

- Uses parameterized queries to prevent SQL injection
- JWT stored in `localStorage`, never in cookies
- Protected routes via token

---

## 🧹 Git Exclusions

- `frontend/public/uploads/` → Ignored (media uploads)
- `backend/scripts/` → Ignored (temporary utilities)

---

## 🛠 Roadmap Ideas

- Granular user permissions (admin/editor)
- Drag-and-drop image uploads
- Full user dashboard
- Live Markdown preview mode (optional)

---

## 🙌 Credits

Built with ❤️ by Lizon
This tool helps convert Drupal 7 sites to a secure, modern, React-based blog platform.

