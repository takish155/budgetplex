import { auth } from "@/auth";
import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import prisma from "@/../lib/prisma";

export const getBillsThisMonthRouter = router({
  getBillsThisMonth: publicProcedure.query(async () => {
    try {
      const session = await auth();
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

      const user = await prisma?.user.findUnique({
        where: { id: session.user?.id },
        select: { bills: true, currencySign: true },
      });
      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      const billsThisMonth = user.bills.filter((bill) => {
        if (bill.dueDate.getMonth() === new Date().getMonth()) return bill;
      });
      const totalBillsToPay = billsThisMonth.reduce(
        (acc, bill) => acc + bill.billAmount,
        0
      );

      const remainingBillsToPay = billsThisMonth.filter((bill) => {
        if (bill.isPaid === false) return bill;
      });
      const totalRemainingBillsToPay = remainingBillsToPay.reduce(
        (acc, bill) => acc + bill.billAmount,
        0
      );

      const highestBill = billsThisMonth.reduce((prev, current) =>
        prev.billAmount > current.billAmount ? prev : current
      );

      const overdueBillTotal = billsThisMonth.reduce((acc, bill) => {
        if (bill.dueDate < new Date() && bill.isPaid === false) {
          return acc + bill.billAmount;
        }
        return acc;
      }, 0);

      return {
        totalBillsToPay,
        totalRemainingBillsToPay,
        billsThisMonth,
        highestBill,
        overdueBillTotal,
        currency: user.currencySign,
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;
    }
  }),
});
