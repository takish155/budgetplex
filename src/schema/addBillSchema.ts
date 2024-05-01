import z from "zod";

export const addBillSchema = z.object({
  billName: z
    .string()
    .min(3, { message: "minBillNameError" })
    .max(30, { message: "maxBillNameError" }),
  billAmount: z
    .number()
    .min(0, { message: "minBillAmountError" })
    .max(1_000_000_000_000_000, { message: "maxBillAmountError" }),
  dueDate: z.date().min(new Date(), { message: "dueDateError" }),
  billNote: z.string().max(1000, { message: "maxBillNoteError" }),
  frequency: z
    .number()
    .min(1, { message: "minFrequencyError" })
    .max(120, { message: "maxFrequencyError" }),
});

export type AddBillErrors =
  | "minBillNameError"
  | "maxBillNameError"
  | "minBillAmountError"
  | "maxBillAmountError"
  | "dueDateError"
  | "maxBillNoteError"
  | "minFrequencyError"
  | "maxFrequencyError";

export type AddBillType = z.infer<typeof addBillSchema>;
