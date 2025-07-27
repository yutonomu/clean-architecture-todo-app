'use client';

import { Todo } from '../../domain/todo';

interface TodoListProps {
  todos: Todo[];
  newTodo: string;
  onNewTodoChange: (value: string) => void;
  onAddTodo: () => void;
  onDeleteTodo: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export default function TodoList({
  todos,
  newTodo,
  onNewTodoChange,
  onAddTodo,
  onDeleteTodo,
  onToggleComplete,
}: TodoListProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Clean Architecture Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border rounded-l px-4 py-2 w-full text-black"
          value={newTodo}
          onChange={(e) => onNewTodoChange(e.target.value)}
          placeholder="Add a new todo"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
          onClick={onAddTodo}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between border-b py-2"
          >
            <span
              className={`${
                todo.completed ? 'line-through text-gray-500' : 'text-black'
              }`}
              onClick={() => onToggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => onDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}