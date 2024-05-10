import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "minPasswordError" })
      .max(30, { message: "maxPasswordError" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwordsDontMatchError",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type ResetPasswordType =
  | "minPasswordError"
  | "maxPasswordError"
  | "passwordsDontMatchError";
