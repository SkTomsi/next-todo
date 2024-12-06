import type { Todo } from "@/lib/types";
import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoStore {
	Todos: Todo[];
	addTodo: (todo: string, description: string, date?: string) => void;
	toggleTodo: (id: string) => void;
	updateTodo: (id: string, todo: Todo) => void;
	getTodoById: (id: string) => Todo | null;
	deleteTodo: (id: string) => void;
	//   clearTodos: () => void;
	//   getDaywiseTodos: (date: string) => Todo[];
}

export const useTodoStore = create<TodoStore>()(
	persist(
		(set, get) => ({
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
			updateTodo: (id: string, todo: Todo) => {
				set((state) => {
					return {
						Todos: state.Todos.map((t) => {
							if (t.id === id) {
								return {
									...t,
									title: todo.title,
									description: todo.description,
									updatedAt: dayjs().toISOString(),
								};
							}
							return t;
						}),
					};
				});
			},
			getTodoById: (id: string) => {
				const todo = get().Todos.find((t) => t.id === id);

				if (!todo) {
					return null;
				}

				return todo;
			},
			deleteTodo: (id: string) => {
				set((state) => {
					return {
						Todos: state.Todos.filter((t) => t.id !== id),
					};
				});
			},
		}),
		{
			name: "todo-store",
		},
	),
);
