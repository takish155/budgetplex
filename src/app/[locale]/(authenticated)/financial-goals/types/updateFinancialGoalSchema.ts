import { z } from "zod";

export const updateFinancialGoalSchema = z.object({
  goalName: z
    .string()
    .min(1, { message: "minNameError" })
    .max(100, { message: "maxNameError" }),
  goalAmount: z
    .number()
    .min(1, { message: "minAmountError" })
    .max(1_000_000_000_000_000, { message: "maxAmountError" }),
  progressAmount: z.number().max(1_000_000_000_000_000, {
    message: "maxAmountError",
  }),
  goalDeadline: z.date(),
  goalDescription: z
    .string()
    .max(500, { message: "maxDescriptionError" })
    .optional(),
});

export type UpdateFinancialGoal = z.infer<typeof updateFinancialGoalSchema>;
