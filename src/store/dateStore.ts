import { create } from "zustand";

interface DateStore {
	selectedDate: string;
	setSelectedDate: (date: string) => void;
}

export const useDateStore = create<DateStore>()((set) => ({
	selectedDate: new Date().toISOString().split("T")[0],
	setSelectedDate: (date: string) => set({ selectedDate: date }),
}));
