
'use client';

import { useState, useEffect } from 'react';
import { LocalStorageTodoRepository } from '../infrastructure/localStorageTodoRepository';
import { addTodo } from '../use-cases/addTodo';
import { getTodos } from '../use-cases/getTodos';
import { updateTodo } from '../use-cases/updateTodo';
import { deleteTodo } from '../use-cases/deleteTodo';
import { Todo } from '../domain/todo';
import TodoList from '../infrastructure/components/TodoList';

const todoRepo = new LocalStorageTodoRepository();

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos(todoRepo)();
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  const handleInputChange = (value: string) => {
    setNewTodo(value);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      const createdTodo = await addTodo(todoRepo)(newTodo);
      setTodos([...todos, createdTodo]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(todoRepo)(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleToggleComplete = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const updated = await updateTodo(todoRepo)({ ...todo, completed: !todo.completed });
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    }
  };

  return (
    <TodoList
      todos={todos}
      newTodo={newTodo}
      onNewTodoChange={handleInputChange}
      onAddTodo={handleAddTodo}
      onDeleteTodo={handleDeleteTodo}
      onToggleComplete={handleToggleComplete}
    />
  );
}
