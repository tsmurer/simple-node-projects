"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.setupDatabase = setupDatabase;
const sqlite3_1 = __importDefault(require("sqlite3"));
exports.db = new sqlite3_1.default.Database('./todo.db');
function setupDatabase() {
    exports.db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0
  )`);
}
