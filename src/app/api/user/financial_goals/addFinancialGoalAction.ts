"use server";

import { AddFinancialGoal } from "@/app/[locale]/(authenticated)/financial-goals/types/addFinancialGoalSchema";
import { auth } from "@/auth";
import prisma from "../../../../../lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

const addFinancialGoalAction = async (data: AddFinancialGoal) => {
  try {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user!.email!,
      },
    });
    if (!user) throw new Error("User not found");

    await prisma.finanicalGoals.create({
      data: {
        goalName: data.goalName,
        goalAmount: data.goalAmount,
        goalDeadline: data.goalDeadline,
        goalDescription: data.goalDescription,
        userId: user.id,
      },
    });

    const locale = await getLocale();
    revalidatePath(`/${locale}/financial-goals`);

    const t = await getTranslations("FinancialGoals");
    return { message: t("addGoalSuccess"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error occurred", status: "ERROR" };
  }
};

export default addFinancialGoalAction;
