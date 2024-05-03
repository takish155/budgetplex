"use server";

import {
  AddTransactionType,
  addTransactionSchema,
} from "@/schema/addTransactionSchema";
import { ResponseStatus } from "@/types/responseStatus";
import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import prisma from "../../../../../lib/prisma";

const addTransactionAction = async (
  data: AddTransactionType
): Promise<ResponseStatus> => {
  const locale = await getLocale();
  const t = await getTranslations("AddTransaction");

  try {
    const session = await getServerSession();

    if (!session) {
      throw new Error("Unauthorized!");
    }
    const isSafe = addTransactionSchema.safeParse(data);
    if (!isSafe.success) {
      throw new Error("Validation failed!");
    }

    const user = await prisma?.user.findUnique({
      where: { email: session.user?.email! },
    });
    if (!user) {
      throw new Error("User not found!");
    }

    if (data.transactionType === "income") {
      await prisma?.income.create({
        data: {
          category: data.category,
          amount: data.amount,
          description: data.note,
          userId: user.id,
          title: data.title,
        },
      });
    }
    if (data.transactionType === "expense") {
      await prisma?.expenses.create({
        data: {
          category: data.category,
          amount: data.amount,
          description: data.note,
          userId: user.id,
          title: data.title,
        },
      });
    }

    revalidatePath(`/${locale}/dashboard`);
    return { message: t("addTransactionSuccess"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "Something went wrong!", status: "ERROR" };
  }
};

export default addTransactionAction;
