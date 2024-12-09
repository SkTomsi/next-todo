"use client";

import TodoDrawer from "@/components/home/todo-drawer";
import TodoList from "@/components/home/todo-list";
import WeekButtons from "@/components/home/week-calender";
import { Button } from "@/components/ui/button";
import { useDateStore } from "@/store/dateStore";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Plus } from "lucide-react";

export default function Home() {
	const { selectedDate, setSelectedDate } = useDateStore();

	const handeDateSelection = (date: Dayjs) => {
		setSelectedDate(date.format("YYYY-MM-DD"));
	};

	return (
		<div className="flex min-h-screen w-full flex-col gap-6 bg-zinc-100">
			<div className="flex flex-col gap-4 rounded-b-[30px] bg-white p-5">
				<h1 className="font-bold text-2xl tracking-tight">onday</h1>
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
			<div className="overflow-hidden px-5">
				<TodoList date={selectedDate} />
			</div>
			<div className="fixed bottom-10 left-0 w-full">
				<div className="mx-auto flex w-full items-start justify-center">
					<TodoDrawer
						TriggerElement={
							<Button
								variant={"outline"}
								className="h-16 w-16 rounded-full shadow-2xl transition-transform duration-150 ease-in-out hover:scale-90 hover:bg-white hover:shadow-sm [&_svg]:size-8"
							>
								<Plus />
							</Button>
						}
					/>
				</div>
			</div>
		</div>
	);
}
