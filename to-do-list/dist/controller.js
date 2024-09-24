"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = createTodo;
exports.getAllTodos = getAllTodos;
exports.getTodo = getTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
const database_1 = require("./database");
function createTodo(req, res) {
    const { task } = req.body;
    database_1.db.run(`INSERT INTO todos(task) VALUES(?)`, [task], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, task, completed: false });
    });
}
function getAllTodos(_req, res) {
    database_1.db.all(`SELECT * FROM todos`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
}
function getTodo(req, res) {
    const { id } = req.params;
    database_1.db.get(`SELECT * FROM todos WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(row);
    });
}
function updateTodo(req, res) {
    const { id } = req.params;
    const { task, completed } = req.body;
    database_1.db.run(`UPDATE todos SET task = ?, completed = ? WHERE id = ?`, [task, completed, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json({ id: Number(id), task, completed });
    });
}
function deleteTodo(req, res) {
    const { id } = req.params;
    database_1.db.run(`DELETE FROM todos WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    });
}
