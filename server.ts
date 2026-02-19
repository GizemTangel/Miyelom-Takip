import express from 'express';
import { createServer as createViteServer } from 'vite';
import db from './db.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  // Auth
  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Geçersiz kullanıcı adı veya şifre' });
    }
  });

  // User Profile
  app.get('/api/user/:id', (req, res) => {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    res.json(user);
  });

  app.put('/api/user/:id', (req, res) => {
    const { bio, appearance_mode } = req.body;
    db.prepare('UPDATE users SET bio = ?, appearance_mode = ? WHERE id = ?').run(bio, appearance_mode, req.params.id);
    res.json({ success: true });
  });

  // Appointments
  app.get('/api/appointments/:userId', (req, res) => {
    const appointments = db.prepare('SELECT * FROM appointments WHERE user_id = ?').all(req.params.userId);
    res.json(appointments);
  });

  // Diary
  app.get('/api/diary/:userId', (req, res) => {
    const entries = db.prepare('SELECT * FROM diary_entries WHERE user_id = ? ORDER BY id DESC').all(req.params.userId);
    res.json(entries.map((e: any) => ({ ...e, tags: JSON.parse(e.tags) })));
  });

  app.post('/api/diary', (req, res) => {
    const { user_id, pain_level, note, tags } = req.body;
    const date = 'Bugün';
    const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    db.prepare('INSERT INTO diary_entries (user_id, date, time, pain_level, note, tags) VALUES (?, ?, ?, ?, ?, ?)')
      .run(user_id, date, time, pain_level, note, JSON.stringify(tags));
    res.json({ success: true });
  });

  // Education
  app.get('/api/education', (req, res) => {
    const articles = db.prepare('SELECT * FROM education_articles').all();
    res.json(articles);
  });

  // Community
  app.get('/api/community', (req, res) => {
    const posts = db.prepare('SELECT * FROM community_posts ORDER BY id DESC').all();
    res.json(posts);
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
