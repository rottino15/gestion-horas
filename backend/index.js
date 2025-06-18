const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Create table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS hours (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT,
  start_time TEXT,
  end_time TEXT
)`);

app.get('/api/hours', (req, res) => {
  db.all('SELECT * FROM hours', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post('/api/hours', (req, res) => {
  const { description, start_time, end_time } = req.body;
  const stmt = db.prepare('INSERT INTO hours (description, start_time, end_time) VALUES (?,?,?)');
  stmt.run([description, start_time, end_time], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, description, start_time, end_time });
  });
  stmt.finalize();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
