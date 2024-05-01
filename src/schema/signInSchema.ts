import z from "zod";

export const signInSchema = z.object({
  username: z
    .string()
    .min(3, { message: "invailidUsernameError" })
    .max(15, { message: "invailidUsernameError" }),
  password: z
    .string()
    .min(6, { message: "invailidPasswordError" })
    .max(30, { message: "invailidPasswordError" }),
});

export type SignInErrors = "invailidUsernameError" | "invailidPasswordError";

export type SignInSchema = z.infer<typeof signInSchema>;
