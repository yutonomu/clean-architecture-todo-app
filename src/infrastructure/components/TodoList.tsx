'use client';

import { Todo } from '../../domain/todo';
import { Plus, Trash2, Check, Circle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* 背景の装飾要素 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* メインカード */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Clean Architecture Todo
            </h1>
          </div>

          {/* 入力フォーム */}
          <div className="relative mb-8">
            <input
              type="text"
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              value={newTodo}
              onChange={(e) => onNewTodoChange(e.target.value)}
              placeholder="タスクを入力してください！"
              onKeyPress={(e) => e.key === 'Enter' && onAddTodo()}
            />
            <button
              className="absolute right-2 top-2 bottom-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-4 flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              onClick={onAddTodo}
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Todo リスト */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-slate-400" />
                </div>
                <p className="text-slate-400 text-sm">タスクが全て完了しました！👏👏👏</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="group bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div 
                      className="flex items-center space-x-3 flex-grow cursor-pointer"
                      onClick={() => onToggleComplete(todo.id)}
                    >
                      <div className="relative">
                        {todo.completed ? (
                          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                            <Check size={14} className="text-white" />
                          </div>
                        ) : (
                          <Circle size={24} className="text-slate-400 hover:text-emerald-400 transition-colors duration-200" />
                        )}
                      </div>
                      <span
                        className={`transition-all duration-300 ${
                          todo.completed 
                            ? 'line-through text-slate-500' 
                            : 'text-white'
                        }`}
                      >
                        {todo.text}
                      </span>
                    </div>
                    <button
                      className="opacity-0 group-hover:opacity-100 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg p-2 transition-all duration-300 hover:scale-110"
                      onClick={() => onDeleteTodo(todo.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}