import type { Todo } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoStore {
  Todos: Todo[];
  addTodo: (todo: string, description: string) => void;
  //   ToggleTodo: (id: string) => void;
  //   EditTodo: (id: string, todo: Todo) => void;
  //   DeleteTodo: (id: string) => void;
  //   ClearTodos: () => void;
  //   GetDaywiseTodos: (date: string) => Todo[];
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      Todos: [],

      addTodo: (todo: string, description: string) => {
        set((state) => {
          return {
            Todos: [
              ...state.Todos,
              {
                id: crypto.randomUUID(),
                title: todo,
                description: description,
                completed: false,
                //TODO: created at timestamp should be the selected date
                createdAt: new Date().toISOString(),
              },
            ],
          };
        });
      },
    }),
    {
      name: "todo-store",
    }
  )
);
