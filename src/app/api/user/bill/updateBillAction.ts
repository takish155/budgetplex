"use server";

import { getServerSession } from "next-auth";
import prisma from "../../../../../lib/prisma";
import { AddBillType, addBillSchema } from "@/schema/addBillSchema";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

const updateBillAction = async (billId: string, data: AddBillType) => {
  try {
    const t = await getTranslations("BillInfo");
    const locale = await getLocale();
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    if (!billId) throw new Error("Invalid bill id");

    const parse = addBillSchema.safeParse(data);
    if (!parse.success) {
      throw new Error("Invalid data");
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

    const nextBill = await prisma.bills.findUnique({
      where: { id: billId + "1", userId: user.id },
    });

    if (nextBill) {
      await prisma.bills.delete({
        where: { id: billId + "1", userId: user.id },
      });

      if (bill.isPaid === true) {
        await prisma.bills.create({
          data: {
            billAmount: data.billAmount,
            billName: data.billName,
            billNote: data.billNote,
            dueDate: new Date(
              bill.dueDate.setMonth(bill.dueDate.getMonth() + bill.frequency)
            ),
            isPaid: false,
            userId: user.id,
            id: bill.id + "1",
          },
        });
      }
    }

    await prisma.bills.update({
      where: { id: billId, userId: user.id },
      data: {
        billAmount: data.billAmount,
        billName: data.billName,
        billNote: data.billNote,
        frequency: data.frequency,
        dueDate: data.dueDate,
      },
    });

    revalidatePath(`/${locale}/bills`);
    return {
      message: {
        title: t("updateBillSuccess"),
        billName: bill.billName,
      },
      status: "SUCCESS",
    };
  } catch (error) {
    console.log("An error occurred", error);
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error occurred", status: "ERROR" };
  }
};

export default updateBillAction;
