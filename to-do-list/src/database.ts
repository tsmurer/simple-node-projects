import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./todo.db');

export function setupDatabase() {
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0
  )`);
}