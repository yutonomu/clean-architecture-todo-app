import { TodoRepository } from './todoRepository';
import { Todo } from '../domain/todo';

export const getTodos = (todoRepo: TodoRepository) => {
  return (): Promise<Todo[]> => {
    return todoRepo.getAll();
  };
};
