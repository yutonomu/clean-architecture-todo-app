import { TodoRepository } from './todoRepository';
import { Todo } from '../domain/todo';

export const updateTodo = (todoRepo: TodoRepository) => {
  return (todo: Todo): Promise<Todo> => {
    return todoRepo.update(todo);
  };
};
