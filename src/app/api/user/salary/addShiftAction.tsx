"use server";

import { AddShiftType, addShiftSchema } from "@/schema/addShiftSchema";
import { addMonths, setDate } from "date-fns";
import { auth } from "@/auth";
import prisma from "../../../../../lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { ResponseStatus } from "@/types/responseStatus";

const addShiftAction = async (data: AddShiftType): Promise<ResponseStatus> => {
  try {
    const validate = addShiftSchema.safeParse(data);
    if (!validate.success) {
      throw new Error("Invalid data");
    }

    const locale = await getLocale();
    const t = await getTranslations("Salary");
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

    const oneMonthAhead = addMonths(new Date(), 1);

    const salary = await prisma.salary.findFirst({
      where: { userId: user.id, date: { lte: oneMonthAhead } },
      orderBy: { date: "desc" },
    });
    if (!salary) {
      const salaryInfo = await prisma.userSalarySettings.findUnique({
        where: { userId: user.id },
      });
      if (!salaryInfo) throw new Error("Salary info not found");

      const currentDayOfMonth = setDate(new Date(), salaryInfo.startDay);
      const newSalary = await prisma.salary.create({
        data: {
          userId: user.id,
          date: currentDayOfMonth,
        },
      });

      await prisma.shift.create({
        data: {
          hourWorked: data.hoursWorked,
          overtime: data.overtimeHour,
          userId: user.id,
          salaryId: newSalary.id,
          date: data.date,
        },
      });

      revalidatePath(`/${locale}/salary`);
      return { message: t("shiftCreated"), status: "SUCCESS" };
    }

    await prisma.shift.create({
      data: {
        hourWorked: data.hoursWorked,
        overtime: data.overtimeHour,
        userId: user.id,
        salaryId: salary.id,
        date: data.date,
      },
    });

    revalidatePath(`/${locale}/salary`);
    return { message: t("shiftCreated"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error occurred", status: "ERROR" };
  }
};

export default addShiftAction;
