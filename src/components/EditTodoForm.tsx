import React, { useState } from "react";

interface EditTodoFormProps {
  editTodo: (todo: string, id: string) => void;
  task: {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
  };
}

export const EditTodoForm = ({ editTodo, task }: EditTodoFormProps) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    editTodo(value, task.id);

    setValue("");
  };
  return (
    <form className="ToDoForm" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        value={value}
        placeholder="Update Task"
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="todo-btn" type="submit">
        Update Task
      </button>
    </form>
  );
};
