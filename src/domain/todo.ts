import { z } from 'zod';

// ドメイン層でZodスキーマを定義する
// これはデータモデルであり、特定のフレームワークには依存しない
export const TodoSchema = z.object({
  id: z.string().uuid(),
  text: z.string().min(1, "Text must not be empty."),
  completed: z.boolean(),
}).strict();

// TypeScriptの型をZodスキーマから生成
export type Todo = z.infer<typeof TodoSchema>;
