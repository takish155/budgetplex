"use server";

import {
  SetupSalaryManager,
  setupSalaryManagerSchema,
} from "@/schema/setupSalaryManagerSchema";
import { auth } from "@/auth";
import prisma from "../../../../../lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";
import { ResponseStatus } from "@/types/responseStatus";
import { revalidatePath } from "next/cache";

const setupSalaryManagerAction = async (
  data: SetupSalaryManager
): Promise<ResponseStatus> => {
  try {
    const locale = getLocale();
    const t = await getTranslations("Salary");
    const validation = setupSalaryManagerSchema.safeParse(data);
    if (!validation.success) {
      throw new Error("Invalid data");
    }

    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user?.id },
    });
    if (!user) {
      throw new Error("User not found");
    }

    await prisma.userSalarySettings.create({
      data: {
        userId: user.id,
        hourlyRate: data.hourlyRate,
        overtime: data.overtimeRate,
        taxRate: data.taxRate,
        payday: data.payday.toString(),
        startDay: data.monthStartDate,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { isSetupSalary: true },
    });

    await prisma.salary.create({
      data: {
        userId: user.id,
      },
    });

    revalidatePath(`/${locale}/salary`);
    return { message: t("configureSuccess"), status: "SUCCESS" };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "ERROR" };
    }
    return { message: "An error occurred", status: "ERROR" };
  }
};

export default setupSalaryManagerAction;
