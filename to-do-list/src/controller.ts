import { Request, Response } from 'express';
import { db } from './database'
import { Todo } from './todo';

export function createTodo(req: Request, res: Response) {
  const { task } = req.body as Todo;
  db.run(`INSERT INTO todos(task) VALUES(?)`, [task], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, task, completed: false });
  });
}

export function getAllTodos(_req: Request, res: Response) {
  db.all<Todo>(`SELECT * FROM todos`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
}

export function getTodo(req: Request, res: Response) {
  const { id } = req.params;
  db.get<Todo>(`SELECT * FROM todos WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(row);
  });
}

export function updateTodo(req: Request, res: Response) {
  const { id } = req.params;
  const { task, completed } = req.body as Todo;
  db.run(`UPDATE todos SET task = ?, completed = ? WHERE id = ?`, [task, completed, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ id: Number(id), task, completed });
  });
}

export function deleteTodo(req: Request, res: Response) {
  const { id } = req.params;
  db.run(`DELETE FROM todos WHERE id = ?`, id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  });
}