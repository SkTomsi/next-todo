import type { Todo } from "@/lib/types";
import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoStore {
	Todos: Todo[];
	addTodo: (todo: string, description: string, date?: string) => void;
	toggleTodo: (id: string) => void;
	//   editTodo: (id: string, todo: Todo) => void;
	//   deleteTodo: (id: string) => void;
	//   clearTodos: () => void;
	//   getDaywiseTodos: (date: string) => Todo[];
}

export const useTodoStore = create<TodoStore>()(
	persist(
		(set) => ({
			Todos: [],

			addTodo: (todo: string, description: string, date?: string) => {
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
								createdAt: date ? date : dayjs().toISOString(),
							},
						],
					};
				});
			},
			toggleTodo: (id: string) => {
				set((state) => {
					return {
						Todos: state.Todos.map((todo) => {
							if (todo.id === id) {
								return {
									...todo,
									completed: !todo.completed,
								};
							}
							return todo;
						}),
					};
				});
			},
		}),
		{
			name: "todo-store",
		},
	),
);
