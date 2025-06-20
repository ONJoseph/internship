import { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import type { Task } from "./types/task";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    const newTask: Task = { id: Date.now(), title, completed: false };
    setTasks((prev) => [...prev, newTask]);
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow w-full max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Task Tracker</h1>
        <TaskInput addTask={addTask} />
        <TaskList tasks={tasks} removeTask={removeTask} toggleTask={toggleTask} />
      </main>

      <footer className="w-full text-center text-sm text-gray-600 py-6">
        <p>&copy; {new Date().getFullYear()} Joseph Ogbole. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://github.com/ONJoseph"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/ONJoseph1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
