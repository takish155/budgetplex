import { getServerSession } from "next-auth";
import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

export const getBillsThisMonthRouter = router({
  getBillsThisMonth: publicProcedure.query(async () => {
    try {
      const session = await getServerSession();
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

      const user = await prisma?.user.findUnique({
        where: { email: session.user?.email! },
        select: { bills: true },
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
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;
    }
  }),
});
