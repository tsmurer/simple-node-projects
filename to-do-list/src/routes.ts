import express from 'express';
import { createTodo, getAllTodos, getTodo, updateTodo, deleteTodo } from './controller';

const router = express.Router();

router.post('/', createTodo);
router.get('/', getAllTodos);
router.get('/:id', getTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
