const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getTodos,
  createTodo,
  toggleTodo,
  deleteTodo
} = require('../controller/todoController');

router.get('/', auth, getTodos);
router.post('/', auth, createTodo);
router.put('/:id', auth, toggleTodo);
router.delete('/:id', auth, deleteTodo);

module.exports = router;
