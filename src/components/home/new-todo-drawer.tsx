import { AddTodoSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "../ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
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

export default function NewTodoDrawer() {
	const form = useForm<z.infer<typeof AddTodoSchema>>({
		resolver: zodResolver(AddTodoSchema),
		defaultValues: {
			title: "",
		},
	});

	function onSubmit(data: z.infer<typeof AddTodoSchema>) {
		// biome-ignore lint/suspicious/noConsoleLog: <for testing purposes>
		console.log(data);
	}

	return (
		<div className="fixed bottom-10 left-0 w-full">
			<div className="mx-auto flex w-full items-start justify-center">
				<Drawer>
					<DrawerTrigger asChild>
						<Button
							variant={"outline"}
							className="h-16 w-16 rounded-full shadow-2xl [&_svg]:size-8"
						>
							<Plus />
						</Button>
					</DrawerTrigger>
					<DrawerContent className="mx-auto w-full max-w-[586px] px-5 py-4">
						<DrawerHeader className="flex flex-col items-start">
							<DrawerTitle>Add your Todo</DrawerTitle>
							<DrawerDescription>
								Add your todo to the list and start your day
							</DrawerDescription>
						</DrawerHeader>
						<div className="mb-10 p-4">
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
									<Button type="submit" className="w-full">
										Add Todo
									</Button>
								</form>
							</Form>
						</div>
					</DrawerContent>
				</Drawer>
			</div>
		</div>
	);
}