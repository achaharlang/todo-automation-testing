import React, { useState } from 'react';

export default function AppTest() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'اولین کار', done: false },
    { id: 2, text: 'دومین کار', done: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  function addTodo() {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
    setNewTodo('');
  }

  function deleteTodo(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  function startEdit(id, currentText) {
    setEditId(id);
    setEditText(currentText);
  }

  function saveEdit(id) {
    setTodos(
      todos.map(t => (t.id === id ? { ...t, text: editText } : t))
    );
    setEditId(null);
    setEditText('');
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', fontFamily: 'Tahoma' }}>
      <h2>لیست Todo ساده</h2>

      <input
        type="text"
        placeholder="کار جدید ..."
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && addTodo()}
        style={{ width: '70%', padding: '8px' }}
      />
      <button onClick={addTodo} style={{ padding: '8px 12px', marginLeft: '8px' }}>
        اضافه کن
      </button>

      <ul style={{ padding: 0, listStyle: 'none', marginTop: '20px' }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: '10px' }}>
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  style={{ padding: '6px', width: '60%' }}
                />
                <button onClick={() => saveEdit(todo.id)} style={{ marginLeft: '8px' }}>
                  ذخیره
                </button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button
                  onClick={() => startEdit(todo.id, todo.text)}
                  style={{ marginLeft: '8px' }}
                >
                  ویرایش
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{ marginLeft: '8px', color: 'red' }}
                >
                  حذف
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

