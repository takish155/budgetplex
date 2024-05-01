"use server";

import { getServerSession } from "next-auth";
import prisma from "../../../../../lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

const removeBillAction = async (billId: string) => {
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

    const nextExist = await prisma.bills.findUnique({
      where: { id: billId + "1", userId: user.id },
    });

    if (nextExist) {
      await prisma.bills.delete({
        where: { id: billId + "1", userId: user.id },
      });
    }

    await prisma.bills.delete({
      where: { id: billId, userId: user.id },
    });

    revalidatePath(`/${locale}/bills`);
    return {
      message: t("deleteBillSuccess"),
      billName: bill.billName,
      status: "SUCCESS",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error aquired", status: "ERROR" };
  }
};

export default removeBillAction;
