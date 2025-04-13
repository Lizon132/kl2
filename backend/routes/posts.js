import express from 'express';
const router = express.Router();

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

export default router;
