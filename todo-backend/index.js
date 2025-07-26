const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Dummy user for login
const user = {
  email: 'automationtest',
  password: 'P@ssword1234'
};

// Initial list of todos
let todos = [
  { id: 1, title: 'First Task' },
  { id: 2, title: 'Second Task' }
];

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === user.email && password === user.password) {
    res.json({ success: true, token: 'testtrue1' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Create a new todo
app.post('/todos', (req, res) => {
  const { title } = req.body;
  const newTodo = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    title
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
  if (todoIndex !== -1) {
    todos[todoIndex].title = title;
    return res.json(todos[todoIndex]);
  }

  res.status(404).json({ error: 'Todo not found' });
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.sendStatus(204);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
