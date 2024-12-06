import { useTodoStore } from "@/store/todo-store";
import TodoCard from "./todo-card";

export default function TodoList({ date }: { date?: string }) {
	const { Todos } = useTodoStore();

	if (!date) {
		return null;
	}

	//TOOD: Seperate this out as a hook
	const filteredTodos = Todos.filter((todo) =>
		todo.createdAt?.includes(date),
	).sort((a) => (a.completed ? 1 : -1));

	if (filteredTodos.length === 0) {
		return (
			<div className="mb-10 flex w-full flex-col gap-6 px-5">
				<p className="text-center font-bold text-xl">You have no Todos</p>
			</div>
		);
	}
	return (
		<div className="mb-10 flex w-full flex-col gap-6 px-5">
			{filteredTodos.map((t) => {
				return <TodoCard todo={t} key={t.id} />;
			})}
		</div>
	);
}
