"use server";

import { AddBillType, addBillSchema } from "@/schema/addBillSchema";
import { ResponseStatus } from "@/types/responseStatus";
import { getServerSession } from "next-auth";
import prisma from "../../../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { getLocale, getTranslations } from "next-intl/server";

const addBillAction = async (
  data: AddBillType
): Promise<ResponseStatus | void> => {
  const locale = await getLocale();
  const t = await getTranslations("BillInfo");
  try {
    const isSafe = addBillSchema.safeParse(data);
    if (!isSafe.success) {
      throw new Error("Invalid data");
    }

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

    await prisma.bills.create({
      data: {
        billAmount: data.billAmount,
        billName: data.billName,
        billNote: data.billNote,
        dueDate: data.dueDate,
        userId: user.id,
        frequency: data.frequency,
        original: true,
      },
    });

    revalidatePath(`/${locale}/bills`);
    return { message: t("addBillSuccess"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error occurred", status: "ERROR" };
  }
};

export default addBillAction;
