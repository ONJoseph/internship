import React, { useState } from 'react';
import { useTodo } from '../components/context/TodoContext';
import { v4 as uuidv4 } from 'uuid';

const TodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const { dispatch } = useTodo();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({
      type: 'ADD',
      payload: { id: uuidv4(), text: text.trim(), completed: false },
    });
    setText('');
  };

  return (
    <form onSubmit={handleAdd} className="flex gap-2 mt-6">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new todo"
        className="flex-1 px-3 py-2 border"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
};

export default TodoForm;
