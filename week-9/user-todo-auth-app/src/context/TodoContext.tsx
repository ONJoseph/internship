import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { useAuth } from './AuthContext';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

type TodoAction =
  | { type: 'ADD'; payload: Todo }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'DELETE'; payload: string }
  | { type: 'EDIT'; payload: { id: string; text: string } }
  | { type: 'SET'; payload: Todo[] };

const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
} | null>(null);

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'SET':
      return { todos: action.payload };
    case 'ADD':
      return { todos: [action.payload, ...state.todos] };
    case 'TOGGLE':
      return {
        todos: state.todos.map((t) => (t.id === action.payload ? { ...t, completed: !t.completed } : t))
      };
    case 'DELETE':
      return { todos: state.todos.filter((t) => t.id !== action.payload) };
    case 'EDIT':
      return {
        todos: state.todos.map((t) => (t.id === action.payload.id ? { ...t, text: action.payload.text } : t))
      };
    default:
      return state;
  }
};

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const { state: auth } = useAuth();
  const storageKey = useMemo(
    () => (auth.user ? `todos_${auth.user.username}` : 'todos_guest'),
    [auth.user]
  );

  const initial: Todo[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
  const [state, dispatch] = useReducer(todoReducer, { todos: initial });

  // Persist per-user
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state.todos));
  }, [state.todos, storageKey]);

  // When user changes, swap todo list
  useEffect(() => {
    const next = JSON.parse(localStorage.getItem(storageKey) || '[]');
    dispatch({ type: 'SET', payload: next });
  }, [storageKey]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodo must be used inside TodoProvider');
  return ctx;
};
