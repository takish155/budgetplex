import { z } from "zod";

export const addFinancialGoalSchema = z.object({
  goalName: z
    .string()
    .min(1, { message: "minNameError" })
    .max(100, { message: "maxNameError" }),
  goalAmount: z
    .number()
    .min(1, { message: "minAmountError" })
    .max(1_000_000_000_000_000, { message: "maxAmountError" }),
  goalDeadline: z.date(),
  goalDescription: z
    .string()
    .max(500, { message: "maxDescriptionError" })
    .optional(),
});

export type AddFinancialGoalErrors =
  | "minNameError"
  | "maxNameError"
  | "minAmountError"
  | "maxAmountError"
  | "maxDescriptionError";
export type AddFinancialGoal = z.infer<typeof addFinancialGoalSchema>;
