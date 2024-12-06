import type { Todo } from "@/lib/types";
import { useTodoStore } from "@/store/todo-store";
import { EllipsisVerticalIcon } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import TodoDrawer from "./todo-drawer";

export default function TodoCard({ todo }: { todo: Todo }) {
	const { toggleTodo } = useTodoStore();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, x: -200 }}
			layout
		>
			<Card className="flex w-full items-center rounded-2xl border-none p-4 shadow-sm">
				<div className="flex w-full items-start gap-4">
					<div className="mt-1 flex">
						<Checkbox
							className={`h-6 w-6 rounded-full ${
								todo.completed ? "opacity-50" : ""
							}`}
							checked={todo.completed}
							onCheckedChange={() => {
								toggleTodo(todo.id);
							}}
						/>
					</div>
					<div className="w-full ">
						<p
							className={`m-0 w-fit text-wrap font-bold font-crimson text-[24px] tracking-tight ${
								todo.completed ? "text-muted-foreground/50 line-through" : ""
							}`}
						>
							{todo.title.length > 35
								? `${todo.title.slice(0, 35)}...`
								: todo.title}
						</p>
						<p
							className={`w-full text-wrap font-crimson text-lg ${
								todo.completed ? "text-accent-foreground/50" : ""
							}`}
						>
							{todo.description}
						</p>
					</div>
				</div>
				<TodoDrawer
					TriggerElement={
						<div className="group flex items-center justify-center rounded-full p-2 transition-all ease-in-out hover:cursor-pointer hover:bg-zinc-100">
							<EllipsisVerticalIcon className="h-5 w-5 " />
						</div>
					}
					existingTodo={todo.id}
				/>
			</Card>
		</motion.div>
	);
}
