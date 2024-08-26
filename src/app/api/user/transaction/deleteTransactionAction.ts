"use server";

import { auth } from "@/auth";
import prisma from "../../../../../lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";
import { ResponseStatus } from "@/types/responseStatus";

const deleteTransactionAction = async (id: string): Promise<ResponseStatus> => {
  const locale = await getLocale();
  const t = await getTranslations("AddTransaction");
  try {
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
    const isIncome = await prisma.income.findUnique({
      where: { id },
    });

    const isExpense = await prisma.expenses.findUnique({
      where: { id },
    });

    if (!isIncome && !isExpense) {
      throw new Error("Transaction not found");
    }

    if (isIncome) {
      if (isIncome.userId !== user.id) {
        throw new Error("Unauthorized");
      }
      await prisma.income.delete({
        where: { id },
      });
    }

    if (isExpense) {
      if (isExpense.userId !== user.id) {
        throw new Error("Unauthorized");
      }
      await prisma.expenses.delete({
        where: { id },
      });
    }

    return { message: t("deleteSuccessful"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error aquired", status: "ERROR" };
  }
};

export default deleteTransactionAction;
