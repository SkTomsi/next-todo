import type { Todo } from "@/lib/types";
import { AddTodoSchema } from "@/lib/zod-schema";
import { useDateStore } from "@/store/dateStore";
import { useTodoStore } from "@/store/todo-store";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { CheckIcon, PlusIcon, TrashIcon } from "lucide-react";
import type React from "react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { SubmitButton } from "../submit-button";
import { Button } from "../ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function TodoDrawer({
	existingTodo,
	TriggerElement,
}: {
	existingTodo?: string;
	TriggerElement: React.JSX.Element;
}) {
	const { addTodo, updateTodo, getTodoById, Todos, deleteTodo } =
		useTodoStore();
	const [todo, setTodo] = useState<Todo | null>();
	const { selectedDate } = useDateStore();
	const [open, setOpen] = useState<boolean>(false);
	const [_isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof AddTodoSchema>>({
		resolver: zodResolver(AddTodoSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (existingTodo) {
			const todo = getTodoById(existingTodo);

			if (todo) {
				setTodo(todo);
				form.setValue("title", todo.title);
				form.setValue("description", todo.description || "");
			}
		}

		() => {
			setTodo(null);
		};
	}, [existingTodo, getTodoById, form, Todos]);

	function onSubmit(data: z.infer<typeof AddTodoSchema>) {
		const result = AddTodoSchema.safeParse(data);

		if (!result.success) {
			toast.error(result.error.message);
			return;
		}

		startTransition(() => {
			if (todo) {
				updateTodo(todo.id, {
					...todo,
					title: data.title,
					description: data.description,
				});
				toast.success("Todo has been updated!");
			} else {
				if (dayjs(selectedDate).isBefore(dayjs(), "day")) {
					toast.error("You cannot create Todos for past dates");
					return;
				}
				addTodo(
					data.title,
					data.description,
					new Date(selectedDate).toISOString(),
				);
				toast.success("Goal captured. Let's make it happen!");
			}
		});

		setOpen(false);
		form.reset();
	}

	function handleTodoDelete() {
		if (!todo) {
			return toast.error("Please select a todo to delete");
		}

		deleteTodo(todo.id);

		toast.error("Todo has been deleted!");
		// setOpen(false);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{TriggerElement}</DrawerTrigger>
			<DrawerContent className="mx-auto w-full max-w-[586px] px-2">
				<DrawerHeader className="flex w-full items-center justify-between">
					<div className="flex w-full flex-col items-start">
						<DrawerTitle>
							{todo ? "Edit Todo" : "Define Your Next Move"}
						</DrawerTitle>
						<DrawerDescription className="mt-2 w-full text-left">
							{todo
								? "Update the details of your existing todo"
								: "Add your first task and start painting your productivity masterpiece!"}
						</DrawerDescription>
					</div>
					<div>
						{todo && (
							<Button
								className="border border-destructive/20 bg-destructive/10"
								variant="outline"
								onClick={handleTodoDelete}
							>
								<TrashIcon className="h-5 w-5 text-destructive" />
							</Button>
						)}
					</div>
				</DrawerHeader>
				<div className="mb-6 p-4">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex w-full flex-col gap-4"
						>
							<FormField
								name="title"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input placeholder="Enter todo title" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="description"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input placeholder="Enter todo description" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<SubmitButton
								text={todo ? "Update Todo" : "Add Todo"}
								icon={
									todo ? (
										<CheckIcon className="h-5 w-5" />
									) : (
										<PlusIcon className="h-5 w-5" />
									)
								}
							/>
							{/* <Button type="submit" className="w-full"></Button> */}
						</form>
					</Form>
					<DrawerFooter className=" w-full px-0">
						<Button
							variant="outline"
							className="h-12 w-full"
							onClick={() => {
								setOpen(false);
								form.reset();
							}}
						>
							Cancel
						</Button>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
