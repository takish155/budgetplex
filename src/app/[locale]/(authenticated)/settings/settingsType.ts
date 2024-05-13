import { z } from "zod";

export const updateUsernameSchema = z.object({
  username: z
    .string()
    .min(3, { message: "minMessageError" })
    .max(20, { message: "maxMessageError" }),
});

export const updateEmailSchema = z.object({
  email: z.string().email({ message: "invalidEmailError" }).max(50),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "invalidPasswordError" })
      .max(30, { message: "invalidPasswordError" }),
    newPassword: z
      .string()
      .min(6, { message: "minPasswordError" })
      .max(30, { message: "maxPasswordError" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "passwordsDontMatchError",
    path: ["confirmPassword"],
  });

export const updateCurrencySignSchema = z.object({
  currencySign: z
    .string()
    .min(1, { message: "invalidCurrencySignError" })
    .max(3, { message: "invalidCurrencySignError" }),
});

export type UpdateCurrencySignSchema = z.infer<typeof updateCurrencySignSchema>;
export type UpdateUsernameSchema = z.infer<typeof updateUsernameSchema>;
export type UpdateEmailSchema = z.infer<typeof updateEmailSchema>;
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;

export type UpdateErrors =
  | "minMessageError"
  | "maxMessageError"
  | "invalidEmailError"
  | "invalidPasswordError"
  | "minPasswordError"
  | "maxPasswordError"
  | "invalidCurrencySignError"
  | "passwordsDontMatchError";
