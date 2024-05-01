import z from "zod";

export const addShiftSchema = z.object({
  date: z.date(),
  hoursWorked: z.number().min(0).max(24),
  overtimeHour: z.number().min(0).max(24),
});

export type AddShiftType = z.infer<typeof addShiftSchema>;
