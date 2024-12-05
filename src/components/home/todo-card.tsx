import type { Todo } from "@/lib/types";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

export default function TodoCard({ todo }: { todo: Todo }) {
  return (
    <Card className="w-full rounded-2xl border-none p-4 shadow-sm">
      <div className="flex w-full items-start gap-4">
        <div className="mt-1 flex">
          <Checkbox className="h-6 w-6 rounded-full" />
        </div>
        <div className="w-full ">
          <p className="m-0 w-fit text-wrap font-bold font-crimson text-[24px]">
            {todo.title.length > 35
              ? `${todo.title.slice(0, 35)}...`
              : todo.title}
          </p>
          <p className="w-full text-wrap font-crimson text-lg">
            {todo.description}
            {/* {todo.description.length > 50
              ? `${todo.description.slice(0, 50)}...`
              : todo.description} */}
          </p>
        </div>
      </div>
    </Card>
  );
}
