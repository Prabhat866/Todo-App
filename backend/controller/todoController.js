const Todo = require('../model/Todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo({ userId: req.user.id, text: req.body.text });
    const saved = await todo.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo.userId.toString() !== req.user.id) return res.status(403).send('Forbidden');
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo.userId.toString() !== req.user.id) return res.status(403).send('Forbidden');
    await todo.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
