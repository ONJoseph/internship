import React from 'react';
import { useTodo } from '../components/context/TodoContext';

const TodoList: React.FC = () => {
  const { state, dispatch } = useTodo();

  return (
    <ul className="mt-4 space-y-2">
      {state.todos.map(todo => (
        <li
          key={todo.id}
          className="flex items-center justify-between bg-gray-100 p-2 rounded"
        >
          <span
            onClick={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
            className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
          >
            {todo.text}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() =>
                dispatch({
                  type: 'EDIT',
                  payload: { id: todo.id, text: prompt('New text:', todo.text) || todo.text },
                })
              }
              className="text-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
