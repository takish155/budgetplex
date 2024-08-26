"use server";

import { SignUpSchema, signUpSchema } from "@/schema/signUpSchema";
import { getTranslations } from "next-intl/server";
import bcrypt from "bcryptjs";
import { ResponseStatus } from "@/types/responseStatus";
import prisma from "../../../../lib/prisma";
import sendVerificationEmail from "../api_util/sendVerificationEmail";
import { signIn } from "@/auth";

export const signUpAction = async (
  data: SignUpSchema
): Promise<ResponseStatus> => {
  try {
    const t = await getTranslations("SignupPage");
    const isValidData = signUpSchema.safeParse(data);

    if (!isValidData.success) {
      throw new Error("Invalid data");
    }

    if (data.password !== data.confirmPassword) {
      throw new Error(t("passwordsDontMatchError"));
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

    const user = await prisma?.user.create({
      data: {
        username: data.username,
        email: data.email,
        hashedPassword,
      },
    });

    await sendVerificationEmail(user.id, data.email);
    await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
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
