"use server";

import { signIn } from "@/auth";
import { signInSchema, SignInSchema } from "@/schema/signInSchema";

export const signInAction = async (data: SignInSchema) => {
  try {
    const isDataSafe = signInSchema.safeParse(data);
    if (!isDataSafe.success) {
      throw new Error("Invalid data");
    }

    await signIn("credentials", data);

    return {
      status: 200,
    };
  } catch (error) {
    console.log("Rejected");
    return {
      status: 500,
    };
  }
};
