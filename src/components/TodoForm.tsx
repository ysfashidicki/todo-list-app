import React, { useState } from "react";

interface ToDoFormProps {
  addTodo: (todo: string) => void;
}

export const TodoForm = ({ addTodo }: ToDoFormProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addTodo(value);

    setValue("");
  };
  return (
    <form className="ToDoForm" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        value={value}
        placeholder="what is the task today?"
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="todo-btn" type="submit">
        Add Task
      </button>
    </form>
  );
};
