"use server";

import { auth } from "@/auth";
import prisma from "../../../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { getLocale, getTranslations } from "next-intl/server";

const markAsPaidBillAction = async (billId: string) => {
  try {
    const t = await getTranslations("BillInfo");
    const locale = await getLocale();
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

    const bill = await prisma.bills.findUnique({
      where: { id: billId, userId: user.id },
    });
    if (!bill) {
      throw new Error("Bill not found");
    }

    await prisma.bills.update({
      where: { id: billId },
      data: { isPaid: true },
    });

    const nextExist = await prisma.bills.findUnique({
      where: { id: billId + "1" },
    });
    if (nextExist) {
      await prisma.bills.delete({ where: { id: billId + "1" } });
    }

    await prisma.bills.create({
      data: {
        billAmount: bill.billAmount,
        billName: bill.billName,
        billNote: bill.billNote,
        dueDate: new Date(
          bill.dueDate.setMonth(bill.dueDate.getMonth() + bill.frequency)
        ),
        isPaid: false,
        userId: user.id,
        id: bill.id + "1",
      },
    });

    revalidatePath(`/${locale}/bills`);
    return {
      message: {
        title: t("markAsPaidSuccess"),
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

export default markAsPaidBillAction;
