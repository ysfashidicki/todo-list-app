import axios from "axios";
import { Todo } from "./Todo";
import { v4 as uuidv4 } from "uuid";
import { TodoForm } from "./TodoForm";
import React, { useState, useEffect } from "react";
import { EditTodoForm } from "./EditTodoForm";

uuidv4();

interface Todo {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

export const TodoWrapper = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: string) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
    console.log(todos);
  };

  const deleteTodo = (id: string) => {
    const token = "c420e0e69b7f27570d835cd1c79d5152ddb65c56";
    fetch(`https://api.todoist.com/rest/v2/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      });
  };

  const editTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task: string, id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  useEffect(() => {
    const token = "c420e0e69b7f27570d835cd1c79d5152ddb65c56";
    fetch("https://api.todoist.com/rest/v2/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const tasks = data.map((task: any) => ({
          id: task.id.toString(),
          task: task.content,
          completed: task.completed,
          isEditing: false,
        }));
        setTodos(tasks);
      });
  }, []);

  return (
    <div className="TodoWrapper">
      <h1 className="font-bold">Todo List</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            task={todo}
            key={index}
            deleteTodo={(id) => deleteTodo(id)}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};
