import type { Todo } from "@/lib/types";
import { useTodoStore } from "@/store/todo-store";
import dayjs from "dayjs";
import { ListChecksIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import TodoCard from "./todo-card";

export default function TodoList({ date }: { date?: string }) {
	const { Todos } = useTodoStore();
	const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

	if (!date) {
		return null;
	}

	useEffect(() => {
		const filteredTodos = Todos.filter((todo) =>
			todo.createdAt?.includes(date),
		).sort((a, b) => {
			if (a.completed !== b.completed) {
				return a.completed ? 1 : -1;
			}

			return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
		});

		setFilteredTodos(filteredTodos);
	}, [Todos, date]);

	const isToday = dayjs().isSame(dayjs(date), "day");

	if (filteredTodos.length === 0) {
		return (
			<div className="mb-10 flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-zinc-400/20 bg-zinc-200/60 px-5 py-10">
				<div className="flex h-20 w-20 items-center justify-center rounded-full border border-zinc-400/20 bg-white/50 p-2">
					<ListChecksIcon className="text-muted-foreground/80" />
				</div>
				<div className="text-center">
					<p className="font-semibold text-sm text-zinc-800">
						{isToday
							? "Your day is a blank canvas"
							: "Nothing planned for this day yet!"}
					</p>
					<p className="font-light text-sm text-zinc-500">
						Every great journey begins with a single task
					</p>
				</div>
			</div>
		);
	}
	return (
		<motion.div className="mb-10 flex min-h-[400px] w-full flex-col gap-6">
			<AnimatePresence mode="wait">
				{filteredTodos.map((t) => {
					return <TodoCard todo={t} key={t.id} />;
				})}
			</AnimatePresence>
		</motion.div>
	);
}
