"use client";

import NewTodoDrawer from "@/components/home/new-todo-drawer";
import TodoCard from "@/components/home/todo-card";
import WeekButtons from "@/components/home/week-calender";
import { useDateStore } from "@/store/dateStore";
import { useTodoStore } from "@/store/todo-store";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export default function Home() {
	const { selectedDate, setSelectedDate } = useDateStore();
	const { Todos } = useTodoStore();

	const handeDateSelection = (date: Dayjs) => {
		setSelectedDate(date.format("YYYY-MM-DD"));
	};

	return (
		<div className="flex min-h-screen w-full flex-col gap-6 bg-zinc-100">
			<div className="flex flex-col gap-4 rounded-b-[30px] bg-white p-5">
				<h1 className="font-bold text-2xl tracking-tight">Todo App</h1>
				<div className="flex w-full items-center justify-center overflow-auto">
					<WeekButtons
						onDaySelect={handeDateSelection}
						selectedDate={selectedDate}
					/>
				</div>
			</div>
			<div className="px-5 font-bold text-xl tracking-tight ">
				<p className="">
					{dayjs(selectedDate).isSame(dayjs(), "day")
						? "Today"
						: dayjs(selectedDate).format("dddd")}
				</p>
			</div>
			<div className="mb-10 flex w-full flex-col gap-6 px-5">
				{Todos.map((t) => {
					return <TodoCard todo={t} key={t.id} />;
				})}
			</div>
			<NewTodoDrawer />
		</div>
	);
}
