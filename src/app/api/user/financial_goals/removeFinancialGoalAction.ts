"use server";

import { getLocale, getTranslations } from "next-intl/server";
import { getUserId } from "../../api_util/getUserId";
import { revalidatePath } from "next/cache";
import prisma from "../../../../../lib/prisma";

const removeFinancialGoalAction = async (id: string) => {
  try {
    const userId = await getUserId();

    const goalToRemove = await prisma?.finanicalGoals.findUnique({
      where: {
        id,
        userId,
      },
    });
    if (!goalToRemove) throw new Error("Goal not found");

    await prisma?.finanicalGoals.delete({
      where: {
        userId,
        id,
      },
    });

    const locale = await getLocale();
    revalidatePath(`/${locale}/financial-goals`);

    const t = await getTranslations("FinancialGoals");
    return { message: t("removeGoalSuccess"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error occurred", status: "ERROR" };
  }
};

export default removeFinancialGoalAction;
