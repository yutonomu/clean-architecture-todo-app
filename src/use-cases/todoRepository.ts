import { Todo } from '../domain/todo';

export interface TodoRepository {
  getAll(): Promise<Todo[]>;
  create(text: string): Promise<Todo>;
  update(todo: Todo): Promise<Todo>;
  delete(id: string): Promise<void>;
}
