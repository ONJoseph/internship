import * as TaskTypes from "../types/task";
console.log(TaskTypes); // check if Task is present

import type { Task } from "../types/task";

interface Props {
  tasks: Task[];
  removeTask: (id: number) => void;
}

const TaskList: React.FC<Props> = ({ tasks, removeTask }) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex justify-between bg-white p-2 rounded shadow">
          <span>{task.title}</span>
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
