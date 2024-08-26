"use server";

import { SetupSalaryManager } from "@/schema/setupSalaryManagerSchema";
import { ResponseStatus } from "@/types/responseStatus";
import { auth } from "@/auth";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import prisma from "../../../../../lib/prisma";

const updateUserSalarySettingsAction = async (
  data: SetupSalaryManager
): Promise<ResponseStatus> => {
  try {
    const locale = await getLocale();
    const t = await getTranslations("Salary");
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const user = await prisma?.user.findUnique({
      where: { id: session.user?.id },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const userSalarySettings = await prisma?.userSalarySettings.findUnique({
      where: { userId: user.id },
    });
    if (!userSalarySettings) {
      await prisma?.userSalarySettings.create({
        data: {
          userId: user.id,
          hourlyRate: data.hourlyRate,
          overtime: data.overtimeRate,
          taxRate: data.taxRate,
          payday: data.payday.toString(),
          startDay: data.monthStartDate,
        },
      });

      await prisma?.user.update({
        where: { id: user.id },
        data: { isSetupSalary: true },
      });
    } else {
      await prisma?.userSalarySettings.update({
        where: { userId: user.id },
        data: {
          hourlyRate: data.hourlyRate,
          overtime: data.overtimeRate,
          taxRate: data.taxRate,
          payday: data.payday.toString(),
          startDay: data.monthStartDate,
        },
      });
    }

    revalidatePath(`/${locale}/salary`);
    return { message: t("salarySettingsUpdated"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error occurred", status: "ERROR" };
  }
};

export default updateUserSalarySettingsAction;
