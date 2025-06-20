const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Create table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS hours (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT,
  start_time TEXT,
  end_time TEXT
)`);

app.get('/api/hours', (req, res) => {
  db.all('SELECT * FROM hours', [], (err, rows) => {
=======
// Initialize table for storing work hours with date information
db.serialize(() => {
  db.run('DROP TABLE IF EXISTS hours');
  db.run(`CREATE TABLE hours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day TEXT,
    description TEXT,
    start_time TEXT,
    end_time TEXT
  )`);
});

app.get('/api/hours', (req, res) => {
  const { month } = req.query;
  let query = 'SELECT * FROM hours';
  let params = [];
  if (month) {
    query += ' WHERE day LIKE ?';
    params.push(`${month}%`);
  }
  db.all(query, params, (err, rows) => {
>>>>>>> 27qwgj-codex/crear-sistema-de-registro-de-horas
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post('/api/hours', (req, res) => {
<<<<<<< HEAD
  const { description, start_time, end_time } = req.body;
  const stmt = db.prepare('INSERT INTO hours (description, start_time, end_time) VALUES (?,?,?)');
  stmt.run([description, start_time, end_time], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, description, start_time, end_time });
=======
  const { day, description, start_time, end_time } = req.body;
  const stmt = db.prepare('INSERT INTO hours (day, description, start_time, end_time) VALUES (?,?,?,?)');
  stmt.run([day, description, start_time, end_time], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, day, description, start_time, end_time });
>>>>>>> 27qwgj-codex/crear-sistema-de-registro-de-horas
  });
  stmt.finalize();
});

<<<<<<< HEAD
=======
app.get('/api/hours/summary', (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({ error: 'month query param required' });
  }
  db.all('SELECT start_time, end_time FROM hours WHERE day LIKE ?', [`${month}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    let totalMs = 0;
    rows.forEach(r => {
      const start = new Date(`1970-01-01T${r.start_time}:00Z`);
      const end = new Date(`1970-01-01T${r.end_time}:00Z`);
      totalMs += end - start;
    });
    const hours = totalMs / 1000 / 60 / 60;
    res.json({ month, hours });
  });
});

>>>>>>> 27qwgj-codex/crear-sistema-de-registro-de-horas
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
