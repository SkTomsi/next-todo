import type { Todo } from "@/lib/types";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

export default function TodoCard({ todo }: { todo: Todo }) {
	return (
		<Card className="rounded-2xl border-none p-4">
			{/* <CardHeader className="text-muted-foreground text-sm">
        {dayjs(todo.createdAt).format("DD/MM/YYYY")}
      </CardHeader> */}
			<div className="flex w-full items-start gap-4">
				<div className="mt-1 flex">
					<Checkbox className="h-6 w-6 rounded-full" />
				</div>
				<div className="">
					<p className="m-0 font-bold font-crimson text-[24px]">{todo.title}</p>
					<p className="font-crimson text-lg">{todo.description}</p>
				</div>
			</div>
		</Card>
	);
}
