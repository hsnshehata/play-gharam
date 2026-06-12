import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static build
app.use(express.static(path.join(__dirname, 'dist')));

// API health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'play-gharam', version: '1.0.0' });
});

// Magazine API — placeholder for future auto-content from Gharam Facebook posts
app.get('/api/magazine', (req, res) => {
  res.json({ articles: [] });
});

// All other routes → React app
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✨ Play Gharam running on port ${PORT}`));