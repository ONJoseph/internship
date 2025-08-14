import { useState, type FormEvent } from "react";
import { useTodo } from "../context/TodoContext";
import { v4 as uuid } from "uuid";

export default function TodoForm() {
  const [text, setText] = useState("");
  const { dispatch } = useTodo();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch({
      type: "ADD",
      payload: { id: uuid(), text: trimmed, completed: false },
    });
    setText("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What do you want to do?"
        className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-800"
      />
      <button
        type="submit"
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Add
      </button>
    </form>
  );
}
