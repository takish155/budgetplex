import z from "zod";

export const sendResetPasswordEmailSchema = z.object({
  email: z.string().email().max(200),
});

export type SendResetPasswordEmail = z.infer<
  typeof sendResetPasswordEmailSchema
>;
