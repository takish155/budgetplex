"use server";

import { getServerSession } from "next-auth";
import prisma from "../../../../../lib/prisma";
import { redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { ResponseStatus } from "@/types/responseStatus";

const deleteTransactionAction = async (id: string): Promise<ResponseStatus> => {
  const locale = await getLocale();
  const t = await getTranslations("AddTransaction");
  try {
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
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

    revalidatePath(`/${locale}/dashboard`);
    return { message: t("deleteSuccessful"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error aquired", status: "ERROR" };
  }
};

export default deleteTransactionAction;
