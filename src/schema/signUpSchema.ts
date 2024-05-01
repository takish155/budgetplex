import z from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "minUsernameError" })
    .max(15, { message: "maxUsernameError" }),
  email: z.string().email({ message: "invalidEmailError" }),
  password: z
    .string()
    .min(6, { message: "minPasswordError" })
    .max(30, { message: "maxPasswordError" }),
  confirmPassword: z.string().refine((data) => data === data, {
    message: "passwordsDontMatchError",
  }),
});

export type SignUpError =
  | "minUsernameError"
  | "maxUsernameError"
  | "invalidEmailError"
  | "minPasswordError"
  | "maxPasswordError"
  | "passwordsDontMatchError";

export type SignUpSchema = z.infer<typeof signUpSchema>;
