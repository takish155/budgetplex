"use server";

import { getServerSession } from "next-auth";
import prisma from "../../../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { getLocale, getTranslations } from "next-intl/server";

const markAsUnpaidBillAction = async (billId: string) => {
  try {
    const t = await getTranslations("BillInfo");
    const locale = await getLocale();
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

    const bill = await prisma.bills.findUnique({
      where: { id: billId, userId: user.id },
    });

    if (!bill) {
      throw new Error("Bill not found");
    }

    await prisma.bills.update({
      where: { id: billId, userId: user.id },
      data: { isPaid: false },
    });

    revalidatePath(`/${locale}/bills`);
    return {
      message: {
        title: t("markAsUnpaidSuccess"),
        description: bill.billName,
        undo: t("undo"),
        billId,
      },
      status: "SUCCESS",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error aquired", status: "ERROR" };
  }
};

export default markAsUnpaidBillAction;
