import { TodoRepository } from './todoRepository';
import { Todo } from '../domain/todo';

// インスタンスの引数がTodoRepositoryであることを保証する
// 関数の引数としてはtextを受け取り、Todoを返す
export const addTodo = (todoRepo: TodoRepository) => {
  return (text: string): Promise<Todo> => {
    return todoRepo.create(text);
  };
};
