import { TodoRepository } from './todoRepository';

export const deleteTodo = (todoRepo: TodoRepository) => {
  return (id: string): Promise<void> => {
    return todoRepo.delete(id);
  };
};
