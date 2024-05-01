"use server";

import { SignUpSchema, signUpSchema } from "@/schema/signUpSchema";
import { getTranslations } from "next-intl/server";
import bcrypt from "bcrypt";
import { ResponseStatus } from "@/types/responseStatus";

export const signUpAction = async (
  data: SignUpSchema
): Promise<ResponseStatus> => {
  try {
    const t = await getTranslations("SignupPage");
    const isValidData = signUpSchema.safeParse(data);

    if (!isValidData.success) {
      throw new Error("Invalid data");
    }

    const usernameExist = await prisma?.user.findUnique({
      where: { username: data.username },
    });
    if (usernameExist) {
      throw new Error(t("usernameAlreadyExistsError"));
    }

    const emailExist = await prisma?.user.findUnique({
      where: { email: data.email },
    });
    if (emailExist) {
      throw new Error(t("emailAlreadyExistsError"));
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma?.user.create({
      data: {
        username: data.username,
        email: data.email,
        hashedPassword,
      },
    });

    return { message: t("signUpSuccess"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return {
      message: "Something went wrong, please try again next time",
      status: "ERROR",
    };
  }
};
