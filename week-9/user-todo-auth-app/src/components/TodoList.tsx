import { useTodo } from '../context/TodoContext';

export default function TodoList() {
  const { state, dispatch } = useTodo();

  if (state.todos.length === 0) {
    return (
      <p className="mt-6 text-center text-gray-500 dark:text-gray-400">
        No todos yet — add your first one above.
      </p>
    );
  }

  return (
    <ul className="mt-4 space-y-2">
      {state.todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between rounded border bg-white px-3 py-2 dark:bg-gray-800"
        >
          <button
            onClick={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
            className={`text-left ${todo.completed ? 'line-through text-gray-500' : ''}`}
            title="Toggle complete"
          >
            {todo.text}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const next = prompt('Edit todo:', todo.text);
                if (next !== null) {
                  const trimmed = next.trim();
                  if (trimmed) dispatch({ type: 'EDIT', payload: { id: todo.id, text: trimmed } });
                }
              }}
              className="rounded border px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Edit
            </button>
            <button
              onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}
              className="rounded bg-red-600 px-2 py-1 text-sm text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
