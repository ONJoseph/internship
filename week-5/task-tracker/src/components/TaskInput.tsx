import React, { useState } from 'react';

interface Props {
  addTask: (task: string) => void;
}

const TaskInput: React.FC<Props> = ({ addTask }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTask(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border border-gray-400 rounded w-full"
        placeholder="Add a task"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add</button>
    </form>
  );
};

export default TaskInput;
