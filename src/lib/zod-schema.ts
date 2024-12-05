import { z } from "zod";

export const AddTodoSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Please enter you Todo Title",
    })
    .max(50, {
      message: "Please add a short title",
    }),
  description: z
    .string()
    .min(1, {
      message: "Please enter your Todo Description",
    })
    .max(100, {
      message: "Please add a short description",
    }),
});
