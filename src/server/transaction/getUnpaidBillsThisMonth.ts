import { publicProcedure, router } from "../trpc";
import { getServerSession } from "next-auth";
import prisma from "../../../lib/prisma";

export const getBillsThisMonthRouter = router({
  getBillsThisMonth: publicProcedure.query(async () => {
    try {
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

      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      const bills = await prisma.bills.findMany({
        where: {
          userId: user.id,
        },
        select: {
          billAmount: true,
          dueDate: true,
          billName: true,
          id: true,
          billNote: true,
          isPaid: true,
          frequency: true,
        },
        orderBy: { dueDate: "asc" },
      });

      return {
        data: bills.sort((a, b) => {
          if (a.isPaid && !b.isPaid) return 1;
          if (!a.isPaid && b.isPaid) return -1;
          return a.dueDate.getTime() - b.dueDate.getTime();
        }),
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
