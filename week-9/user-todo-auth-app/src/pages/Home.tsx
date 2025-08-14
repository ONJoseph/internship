import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Your Todos</h1>
      <TodoForm />
      <TodoList />
    </main>
  );
}
