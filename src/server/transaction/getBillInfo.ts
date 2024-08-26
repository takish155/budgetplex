import { auth } from "@/auth";
import { publicProcedure, router } from "../trpc";
import prisma from "../../../lib/prisma";

export const getBillInfoRouter = router({
  getBillInfo: publicProcedure.query(async () => {
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

      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      const bills = await prisma.bills.findMany({
        where: {
          userId: user.id,
          dueDate: {
            gte: new Date(currentYear, currentMonth - 1, 1),
            lt: new Date(currentYear, currentMonth, 1),
          },
        },
        select: {
          billAmount: true,
          isPaid: true,
        },
      });

      let unpaidBills = 0;
      let paidBills = 0;
      const monthlyBillAmount = bills.reduce(
        (acc, bill) => acc + bill.billAmount,
        0
      );

      bills
        .filter((bill) => !bill.isPaid)
        .forEach((bill) => {
          unpaidBills += bill.billAmount;
        });
      bills
        .filter((bill) => bill.isPaid)
        .forEach((bill) => {
          paidBills += bill.billAmount;
        });

      return {
        data: {
          unpaidBills,
          paidBills,
          monthlyBillAmount,
        },
        status: "SUCCESS",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message, status: "ERROR" };
      }
      return { message: "An error aquired", status: "ERROR" };
    }
  }),
});
