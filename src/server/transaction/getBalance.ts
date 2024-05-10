import { getServerSession } from "next-auth";
import { publicProcedure, router } from "../trpc";
import prisma from "../../../lib/prisma";
import { z } from "zod";

export const getBalanceRouter = router({
  getBalance: publicProcedure
    .input(
      z.object({
        index: z.number().optional(),
        category: z.string().optional(),
      })
    )
    .query(async (opts) => {
      try {
        const user = await getServerSession();
        if (!user) {
          throw new Error("Unauthorized");
        }

        const date = new Date();
        if (opts.input.index) {
          date.setMonth(date.getMonth() + opts.input.index);
        }

        const data = await prisma?.user.findUnique({
          where: { email: user.user?.email! },
          select: {
            income: { select: { amount: true, date: true, category: true } },
            expenses: { select: { amount: true, date: true, category: true } },
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
              .filter((transaction) => {
                if (opts.input.category) {
                  if (opts.input.category === "all") return true;
                  return transaction.category === opts.input.category;
                }
                return true;
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
              .filter((transaction) => {
                if (opts.input.category === "all") return true;
                return transaction.category === opts.input.category;
              })
              .reduce((acc, curr) => acc + curr.amount, 0) ?? 0,
        };
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching data");
      }
    }),
});
