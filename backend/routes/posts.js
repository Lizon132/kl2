import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET paginated posts
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page || '1');
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const [rows] = await req.db.query(
      'SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// GET /posts - list all posts
router.get('/all', async (req, res) => {
  const [posts] = await req.db.query('SELECT id, title FROM posts ORDER BY created_at DESC');
  res.json(posts);
});

// GET /posts/:id - get a specific post
router.get('/:id', async (req, res) => {
  const [rows] = await req.db.query('SELECT id, title, body FROM posts WHERE id = ?', [req.params.id]);
  if (rows.length === 0) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(rows[0]);
});

// PUT /posts/:id - update a specific post (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  const { body } = req.body;
  await req.db.query('UPDATE posts SET body = ? WHERE id = ?', [body, req.params.id]);
  res.json({ success: true });
});

export default router;
