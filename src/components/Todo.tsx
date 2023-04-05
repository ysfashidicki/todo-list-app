import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

interface TodoProps {
  task: {
    id: string;
    task: string;
  };
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
}

export const Todo = ({ task, deleteTodo, editTodo }: TodoProps) => {
  return (
    <div className="Todo">
      <p>{task.task}</p>
      <div className="flex gap-3">
        <FaTrash onClick={() => deleteTodo(task.id)} />
        <FaEdit onClick={() => editTodo(task.id)} />
      </div>
    </div>
  );
};
