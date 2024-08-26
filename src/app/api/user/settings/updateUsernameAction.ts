"use server";

import { auth } from "@/auth";
import prisma from "../../../../../lib/prisma";
import { getTranslations } from "next-intl/server";
import { ResponseStatus } from "@/types/responseStatus";
import { updateUsernameSchema } from "@/app/[locale]/(authenticated)/settings/settingsType";

const updateUsernameAction = async (
  username: string
): Promise<ResponseStatus> => {
  try {
    const isSafe = updateUsernameSchema.safeParse({ username: username });
    if (!isSafe.success) throw new Error("Invalid username");

    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
    });
    if (!user) throw new Error("User not found");

    if (user.username === username) throw new Error("sameUsernameError");

    const userExists = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (userExists) throw new Error("usernameExistsError");

    await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        username: username,
      },
    });

    const t = await getTranslations("SettingsPage");
    return { message: t("usernameUpdateSuccess"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      const t = await getTranslations("SettingsPage");
      if (error.message === "sameUsernameError") {
        return { message: t("sameUsernameError"), status: "ERROR" };
      }
      if (error.message === "usernameExistsError") {
        return { message: t("usernameExistsError"), status: "ERROR" };
      }
      return { message: error.message, status: "ERROR" };
    }
    return { message: "Something went wrong", status: "ERROR" };
  }
};

export default updateUsernameAction;
