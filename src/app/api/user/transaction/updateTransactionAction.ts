"use server";

import {
  AddTransactionType,
  addTransactionSchema,
} from "@/schema/addTransactionSchema";
import { ResponseStatus } from "@/types/responseStatus";
import prisma from "../../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";

export interface UpdateTransactionType extends AddTransactionType {
  id: string;
}

const updateTransactionAction = async (
  data: UpdateTransactionType
): Promise<ResponseStatus | void> => {
  try {
    const locale = await getLocale();
    const t = await getTranslations("AddTransaction");
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const isSafe = addTransactionSchema.safeParse(data);
    if (!isSafe.success) {
      throw new Error("Invalid data");
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isIncome = await prisma.income.findUnique({
      where: { id: data.id },
    });

    const isExpense = await prisma.expenses.findUnique({
      where: { id: data.id },
    });

    if (isIncome) {
      if (isIncome.userId !== user.id) {
        throw new Error("Unauthorized");
      }

      if (isIncome && data.transactionType === "income") {
        await prisma.income.update({
          where: { id: data.id },
          data: {
            title: data.title,
            amount: data.amount,
            description: data.note,
            category: data.category,
          },
        });
      }

      if (isIncome && data.transactionType === "expense") {
        await prisma.income.delete({
          where: { id: data.id },
        });
        await prisma.expenses.create({
          data: {
            title: data.title,
            amount: data.amount,
            description: data.note,
            category: data.category,
            userId: user.id,
            date: isIncome.date,
            id: data.id,
          },
        });
      }
    }

    if (isExpense) {
      if (isExpense.userId !== user.id) {
        throw new Error("Unauthorized");
      }

      if (isExpense && data.transactionType === "expense") {
        await prisma.expenses.update({
          where: { id: data.id },
          data: {
            title: data.title,
            amount: data.amount,
            description: data.note,
            category: data.category,
            userId: user.id,
            date: isExpense.date,
          },
        });
        console.log("i was called");
      }

      if (isExpense && data.transactionType === "income") {
        await prisma.expenses.delete({
          where: { id: data.id },
        });
        await prisma.income.create({
          data: {
            title: data.title,
            amount: data.amount,
            description: data.note,
            category: data.category,
            userId: user.id,
            date: isExpense.date,
            id: data.id,
          },
        });
        console.log("i was called and supposed to be");
      }
    }

    if (!isIncome && !isExpense) {
      throw new Error("Transaction not found");
    }

    return { message: t("updateSuccessful"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error aquired", status: "ERROR" };
  }
};

export default updateTransactionAction;
