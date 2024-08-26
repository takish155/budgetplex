"use server";

import { AddShiftType, addShiftSchema } from "@/schema/addShiftSchema";
import { auth } from "@/auth";
import prisma from "../../../../../lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

const updateShiftAction = async (data: AddShiftType, id: string) => {
  try {
    const t = await getTranslations("Salary");
    const locale = await getLocale();

    const validate = addShiftSchema.safeParse(data);
    if (!validate.success) {
      throw new Error("Invalid data");
    }

    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: { id: session.user?.id },
    });
    if (!user) throw new Error("User not found");

    await prisma.shift.update({
      where: { id },
      data: {
        hourWorked: data.hoursWorked,
        overtime: data.overtimeHour,
        date: data.date,
      },
    });

    revalidatePath(`/${locale}/salary`);
    return { message: t("shiftUpdated"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error occurred", status: "ERROR" };
  }
};

export default updateShiftAction;
