import { getServerSession } from "next-auth";
import { publicProcedure, router } from "../trpc";
import prisma from "../../../lib/prisma";
import { z } from "zod";

export const getBalanceRouter = router({
  getBalance: publicProcedure
    .input(
      z.object({
        index: z.number(),
      })
    )
    .query(async (opts) => {
      const user = await getServerSession();
      if (!user) {
        throw new Error("Unauthorized");
      }

      const date = new Date();
      date.setMonth(date.getMonth() + opts.input.index);

      const data = await prisma?.user.findUnique({
        where: { email: user.user?.email! },
        select: {
          income: { select: { amount: true, date: true } },
          expenses: { select: { amount: true, date: true } },
        },
      });

      return {
        income:
          data?.income
            .filter((transaction) => {
              return (
                transaction.date.getMonth() === date.getMonth() &&
                transaction.date.getFullYear() === date.getFullYear()
              );
            })
            .reduce((acc, curr) => acc + curr.amount, 0) ?? 0,
        expenses:
          data?.expenses
            .filter((transaction) => {
              return (
                transaction.date.getMonth() === date.getMonth() &&
                transaction.date.getFullYear() === date.getFullYear()
              );
            })
            .reduce((acc, curr) => acc + curr.amount, 0) ?? 0,
      };
    }),
});
