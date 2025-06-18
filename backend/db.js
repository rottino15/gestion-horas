const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'database.sqlite';

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('SQLite database connected');
  }
});

module.exports = db;
