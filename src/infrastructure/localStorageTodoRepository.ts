import { TodoRepository } from '../use-cases/todoRepository';
import { Todo } from '../domain/todo';

const TODO_STORAGE_KEY = 'todos';

export class LocalStorageTodoRepository implements TodoRepository {
  async getAll(): Promise<Todo[]> {
    if (typeof window === 'undefined') return [];
    const todos = localStorage.getItem(TODO_STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
  }

  async create(text: string): Promise<Todo> {
    const todos = await this.getAll();
    const newTodo: Todo = {
      id: new Date().toISOString(),
      text,
      completed: false,
    };
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify([...todos, newTodo]));
    return newTodo;
  }

  async update(todo: Todo): Promise<Todo> {
    const todos = await this.getAll();
    const updatedTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(updatedTodos));
    return todo;
  }

  async delete(id: string): Promise<void> {
    const todos = await this.getAll();
    const updatedTodos = todos.filter((t) => t.id !== id);
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(updatedTodos));
  }
}
