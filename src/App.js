import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://localhost:4000/todos')
        .then(res => res.json())
        .then(data => setTodos(data));
    }
  }, [isLoggedIn]);

  // Login handler
  const handleLogin = async () => {
    setLoginError('');
    if (!email.trim() || !password.trim()) {
      setLoginError('please enter email and password');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setIsLoggedIn(true);
        setLoginError('');
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (err) {
      setLoginError('Network error');
    }
  };

  // Add new todo
  const addTodo = async () => {
    if (!input.trim()) return;
    try {
      const res = await fetch('http://localhost:4000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input }),
      });
      if (res.ok) {
        const newTodo = await res.json();
        setTodos(prev => [...prev, newTodo]);
        setInput('');
      }
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:4000/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  // Save edited todo
  const saveEdit = async (id) => {
    if (!editTitle.trim()) return;
    try {
      const res = await fetch(`http://localhost:4000/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle }),
      });
      if (res.ok) {
        const updatedTodos = todos.map(todo =>
          todo.id === id ? { ...todo, title: editTitle } : todo
        );
        setTodos(updatedTodos);
        setEditingId(null);
        setEditTitle('');
      }
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  if (!isLoggedIn) {
    // Login page
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ display: 'block', marginBottom: '1rem', width: '300px' }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ display: 'block', marginBottom: '1rem', width: '300px' }}
        />
        <button onClick={handleLogin}>Login</button>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      </div>
    );
  }

  // Main todo app
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Todo List</h1>
      <input
        placeholder="Please insert new task"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add Task</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: '0.5rem' }}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') saveEdit(todo.id);
                  }}
                  autoFocus
                />
                <button onClick={() => saveEdit(todo.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditTitle(todo.title);
                  }}
                  style={{ marginLeft: '1rem' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{ marginLeft: '1rem' }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
