"use server";

import {
  AddFinancialGoal,
  addFinancialGoalSchema,
} from "@/app/[locale]/(authenticated)/financial-goals/types/addFinancialGoalSchema";
import { getUserId } from "../../api_util/getUserId";
import prisma from "../../../../../lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { UpdateFinancialGoal } from "@/app/[locale]/(authenticated)/financial-goals/types/updateFinancialGoalSchema";

const updateFinancialGoalAction = async (
  data: UpdateFinancialGoal,
  id: string
) => {
  try {
    const isSafe = addFinancialGoalSchema.safeParse(data);
    if (!isSafe.success) throw new Error("Invalid data");

    const userId = await getUserId();

    const goalToUpdate = await prisma.finanicalGoals.findUnique({
      where: {
        id,
        userId,
      },
    });
    if (!goalToUpdate) throw new Error("Goal not found");

    await prisma.finanicalGoals.update({
      where: {
        id,
        userId,
      },
      data: {
        goalName: data.goalName,
        goalAmount: data.goalAmount,
        goalDeadline: data.goalDeadline,
        goalDescription: data.goalDescription,
        goalProgress: data.progressAmount,
      },
    });

    const locale = await getLocale();
    revalidatePath(`/${locale}/financial-goals`);

    const t = await getTranslations("FinancialGoals");
    return { message: t("updateGoalSuccess"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error occurred", status: "ERROR" };
  }
};

export default updateFinancialGoalAction;
