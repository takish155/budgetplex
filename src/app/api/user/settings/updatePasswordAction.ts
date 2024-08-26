"use server";

import {
  UpdatePasswordSchema,
  updatePasswordSchema,
} from "@/app/[locale]/(authenticated)/settings/settingsType";
import { auth } from "@/auth";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { getTranslations } from "next-intl/server";

const updatePasswordAction = async (data: UpdatePasswordSchema) => {
  try {
    const isSafe = updatePasswordSchema.safeParse(data);
    if (!isSafe.success) throw new Error("Invalid data");

    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
    });
    if (!user) throw new Error("User not found");

    const passwordMatch = await bcrypt.compare(
      data.currentPassword,
      user.hashedPassword!
    );
    const t = await getTranslations("SettingsPage");

    if (!passwordMatch) {
      return { message: t("currentPasswordIncorrect"), status: "ERROR" };
    }

    if (data.currentPassword === data.newPassword) {
      return { message: t("samePasswordError"), status: "ERROR" };
    }

    const newHashedPassword = await bcrypt.hash(data.newPassword, 10);
    await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        hashedPassword: newHashedPassword,
      },
    });

    return { message: t("passwordUpdateSuccess"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "Something went wrong", status: "ERROR" };
  }
};

export default updatePasswordAction;
