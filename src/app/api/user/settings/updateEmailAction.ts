"use server";

import { getServerSession } from "next-auth";
import prisma from "../../../../../lib/prisma";
import { getTranslations } from "next-intl/server";
import { updateEmailSchema } from "@/app/[locale]/(authenticated)/settings/settingsType";

const updateEmailAction = async (email: string) => {
  try {
    const isSafe = updateEmailSchema.safeParse({
      email: email,
    });
    if (!isSafe.success) throw new Error("Invalid email");

    const session = await getServerSession();
    if (!session) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email!,
      },
    });
    if (!user) throw new Error("User not found");
    if (user.email === email) throw new Error("sameEmailError");

    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userExists) throw new Error("emailExistsError");

    await prisma.user.update({
      where: {
        email: session.user?.email!,
        id: user.id,
      },
      data: {
        email: email,
      },
    });

    const t = await getTranslations("SettingsPage");
    return { message: t("emailUpdateSuccess"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      const t = await getTranslations("SettingsPage");
      if (error.message === "sameEmailError") {
        return { message: t("sameEmailError"), status: "ERROR" };
      }
      if (error.message === "emailExistsError") {
        return { message: t("emailExistsError"), status: "ERROR" };
      }
      return { message: error.message, status: "ERROR" };
    }
    return { message: "Something went wrong", status: "ERROR" };
  }
};

export default updateEmailAction;
