import { z } from "zod";

export const AddTodoSchema = z.object({
	title: z.string().min(1, {
		message: "Please enter you Todo Title",
	}),
});
