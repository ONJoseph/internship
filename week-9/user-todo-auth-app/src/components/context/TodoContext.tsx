import React, { createContext, useReducer, useEffect, useContext } from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type State = {
  todos: Todo[];
};

type Action =
  | { type: 'ADD'; payload: Todo }
  | { type: 'DELETE'; payload: string }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'EDIT'; payload: { id: string; text: string } };

const TodoContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: { todos: [] }, dispatch: () => {} });

const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD':
      return { todos: [action.payload, ...state.todos] };
    case 'DELETE':
      return { todos: state.todos.filter(t => t.id !== action.payload) };
    case 'TOGGLE':
      return {
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case 'EDIT':
      return {
        todos: state.todos.map(t =>
          t.id === action.payload.id ? { ...t, text: action.payload.text } : t
        ),
      };
    default:
      return state;
  }
};

const initialState: State = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
};

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
