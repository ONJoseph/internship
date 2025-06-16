import type { Task } from "../types/task";

interface Props {
  tasks: Task[];
  removeTask: (id: number) => void;
  toggleTask: (id: number) => void;
}

const TaskList: React.FC<Props> = ({ tasks, removeTask, toggleTask }) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between bg-white p-2 rounded shadow">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="accent-blue-500"
            />
            <span className={task.completed ? "line-through text-gray-500" : ""}>
              {task.title}
            </span>
          </div>
          <button
            onClick={() => removeTask(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            ✖
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
