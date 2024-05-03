"use server";

import prisma from "../../../../../lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";
import { getUserId } from "../../api_util/getUserId";
import { revalidatePath } from "next/cache";

const addProgressToGoalAction = async (id: string, progressAmount: number) => {
  try {
    const userId = await getUserId();

    const goal = await prisma.finanicalGoals.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!goal) throw new Error("Goal not found");

    await prisma.finanicalGoals.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        goalProgress: goal.goalProgress + progressAmount,
      },
    });

    const locale = await getLocale();
    revalidatePath(`/${locale}/financial-goals`);

    const t = await getTranslations("FinancialGoals");
    return { message: t("addProgressSuccess"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error occurred", status: "ERROR" };
  }
};

export default addProgressToGoalAction;
