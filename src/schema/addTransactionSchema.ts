import z from "zod";

export const categoryEnum = [
  "investment",
  "utilities",
  "groceries",
  "transportation",
  "entertainment",
  "diningOut",
  "education",
  "health",
  "other",
  "all",
] as const;

export type TransactionCategory = (typeof categoryEnum)[number];

export const addTransactionSchema = z.object({
  transactionType: z.enum(["expense", "income"]),
  category: z
    .enum(categoryEnum)
    .refine((value) => categoryEnum.includes(value), {
      message: "categoryError",
    }),
  amount: z
    .number()
    .min(0, { message: "minAmountError" })
    .max(1000000000000000, { message: "maxAmountError" }),
  note: z.string().max(1000, { message: "maxNoteError" }),
  title: z
    .string()
    .min(3, { message: "minTitleError" })
    .max(30, { message: "maxTitleError" }),
});

export type AddTransactionErrors =
  | "minTitleError"
  | "maxTitleError"
  | "minAmountError"
  | "maxAmountError"
  | "maxNoteError"
  | "categoryError";

export type AddTransactionType = z.infer<typeof addTransactionSchema>;
