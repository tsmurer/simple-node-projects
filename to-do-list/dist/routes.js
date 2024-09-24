"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post('/', controller_1.createTodo);
router.get('/', controller_1.getAllTodos);
router.get('/:id', controller_1.getTodo);
router.put('/:id', controller_1.updateTodo);
router.delete('/:id', controller_1.deleteTodo);
exports.default = router;
