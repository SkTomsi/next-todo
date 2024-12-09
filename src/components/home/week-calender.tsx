import { Button } from "@/components/ui/button";
import dayjs, { type Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";

interface WeekButtonProps {
	onDaySelect?: (date: Dayjs) => void;
	selectedDate?: string;
	className?: string;
}

const WeekButtons: React.FC<WeekButtonProps> = ({
	onDaySelect,
	selectedDate,
	className = "",
}) => {
	const [currentWeek, setCurrentWeek] = useState<Dayjs[]>([]);

	const today = dayjs();

	const generateWeekDates = useCallback((): Dayjs[] => {
		const weekArray = Array.from({ length: 7 }, (_, i) => dayjs().day(i));
		return weekArray;
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setCurrentWeek(generateWeekDates());

		const intervalId = setInterval(() => {
			const updatedWeek = generateWeekDates();

			if (!updatedWeek[0].isSame(currentWeek[0], "day")) {
				setCurrentWeek(updatedWeek);
			}
		}, 60000);

		return () => clearInterval(intervalId);
	}, [generateWeekDates]);

	const handleDayClick = (date: Dayjs) => {
		onDaySelect?.(date);
	};

	function getDateStyles(date: Dayjs): string {
		if (date.isSame(dayjs(selectedDate), "day")) {
			return "bg-black text-white hover:text-white";
		}

		if (date.isBefore(dayjs(today), "day")) {
			return "text-black";
		}

		if (date.isSame(dayjs(), "day")) {
			return "text-black";
		}

		return "text-muted-foreground/40";
	}

	return (
		<div
			className={`flex w-full items-center justify-between py-2 ${className}`}
		>
			{currentWeek?.map((date) => (
				<Button
					key={date.format("YYYY-MM-DD")}
					onClick={() => handleDayClick(date)}
					className={`group flex h-auto flex-col gap-2 rounded-xl bg-transparent ${getDateStyles(date)} transition-colors ease-in-out hover:bg-muted hover:text-black`}
				>
					<p
						className={`font-medium ${date.isSame(selectedDate, "day") ? "text-white group-hover:text-muted-foreground" : "text-muted-foreground/40 group-hover:text-black"}`}
					>
						{date.format("dd").slice(0, 1)}
					</p>
					<p className="font-bold text-base">{date.format("DD")}</p>
				</Button>
			))}
		</div>
	);
};

export default WeekButtons;
