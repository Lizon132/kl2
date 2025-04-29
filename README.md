# KL2: Legacy Drupal Migration to React + Node.js

This project migrates legacy content from a Drupal 7 website into a modern stack using:

- ✅ MySQL backend
- ✅ Node.js (Express) API server
- ✅ React + Vite frontend
- ✅ TipTap editor for WYSIWYG editing
- ✅ Clean embed handling for YouTube videos and Google Maps

---

## 🚀 Features

- Migrate posts from Drupal 7 to a simplified MySQL database
- Admin login system (with JWT authentication)
- Posts displayed paginated (10 per page)
- Rich text editor (TipTap) for editing posts
- **Embed YouTube videos** via URL
- **Embed Google Maps** using the "Embed Map" links
- Human-readable Source View available during editing
- Modern Bootstrap 5 styling
- Safe database queries to protect against injection attacks
- `.env` used to protect database credentials (not hard-coded)

---

## ⚙️ Project Structure

```
kl2/
├── backend/        # Node.js + Express API (Auth, Posts API)
│   ├── routes/     # API route files (posts.js, auth.js)
│   └── db.js       # Database connection
│   └── .env        # Environment secrets (MySQL credentials)
├── frontend/       # React frontend (Vite scaffold)
│   ├── src/
│   │   ├── pages/      # Pages like PostsPage, EditorPage, LoginPage
│   │   ├── components/ # Navbar, etc.
│   └── public/uploads/ # Uploaded images (ignored by Git)
├── db/             # Database .sql migration files
├── README.md       # Project documentation
└── package.json    # Project dependencies
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

4. **Setup your `.env` file in `/backend`**

```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=kl
JWT_SECRET=your_secret_key_here
```

5. **Run servers**

_Backend:_

```bash
cd backend
node server.js
```

_Frontend:_

```bash
cd ../frontend
npm run dev
```

---

## 🛡 Important Notes

- **Uploads Folder**: `/frontend/public/uploads/` is ignored by Git.
- **Scripts Folder**: `/backend/scripts/` is ignored by Git (migration utilities).
- **Embedding YouTube and Google Maps**:  
  - YouTube: Paste the normal video URL (TipTap auto-embeds)
  - Google Maps: **Only use "Embed Map" link** from Google (URL must include `maps/embed?pb=...`)
- **Login**: After logging in, users can edit posts.

---

## 🧹 Future Improvements

- Fine-grained user permission system (author/editor/admin)
- Image upload management
- Bulk edit or delete posts
- Frontend enhancements (categories, search, etc.)
- Fully public GitHub-friendly release module for easy Drupal → React migrations

---

## 🙌 Credits

Built with ❤️ by [Your Name]  
(Original Drupal migration project.)

