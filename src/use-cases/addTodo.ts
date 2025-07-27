import { TodoRepository } from './todoRepository';
import { Todo } from '../domain/todo';

export const addTodo = (todoRepo: TodoRepository) => {
  return (text: string): Promise<Todo> => {
    return todoRepo.create(text);
  };
};
