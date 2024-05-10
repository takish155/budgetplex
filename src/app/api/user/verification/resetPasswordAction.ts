"use server";

import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "@/app/[locale]/forget-password/schema/resetPasswordSchema";
import prisma from "../../../../../lib/prisma";
import bcrpt from "bcrypt";
import { getTranslations } from "next-intl/server";

const resetPasswordAction = async (
  data: ResetPasswordSchema,
  userId: string,
  tokenId: string
) => {
  try {
    const isSafe = resetPasswordSchema.safeParse(data);
    if (!isSafe.success) {
      throw new Error("Invalid data");
    }

    const token = await prisma.forgotPassword.findMany({
      where: {
        userId,
      },
    });

    const t = await getTranslations("ResetPassword");
    if (!token) {
      throw new Error(t("tokenInvalidOrExpired"));
    }

    const tokenExist = token.filter(
      async (t) => await bcrpt.compare(tokenId, t.token)
    );
    if (!tokenExist) {
      throw new Error(t("tokenInvalidOrExpired"));
    }

    const hashedPassword = await bcrpt.hash(data.password, 10);
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedPassword,
      },
    });

    await prisma.forgotPassword.deleteMany({
      where: {
        userId,
      },
    });

    return { message: t("resetPasswordSuccess"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error occurred", status: "ERROR" };
  }
};

export default resetPasswordAction;
