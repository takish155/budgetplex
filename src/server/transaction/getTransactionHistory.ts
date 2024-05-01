import { publicProcedure, router } from "../trpc";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { z } from "zod";

export const getTransactionHistoryRouter = router({
  getTransactionHistory: publicProcedure
    .input(
      z.object({
        index: z.number(),
      })
    )
    .query(async (opts) => {
      try {
        const session = await getServerSession();
        if (!session) {
          throw new Error("Unauthorized");
        }

        const data = await prisma.user.findUnique({
          where: { email: session.user?.email! },
          select: {
            income: true,
            expenses: true,
          },
        });

        const date = new Date();
        date.setMonth(date.getMonth() + opts.input.index);

        const income = data?.income.map((transaction) => {
          return {
            ...transaction,
            type: "income",
          };
        });

        const expenses = data?.expenses.map((transaction) => {
          return {
            ...transaction,
            type: "expense",
          };
        });

        return {
          data: [...(income ?? []), ...(expenses ?? [])]
            .filter((transaction) => {
              return (
                transaction.date.getMonth() === date.getMonth() &&
                transaction.date.getFullYear() === date.getFullYear()
              );
            })

            .sort((a, b) => b.date.getTime() - a.date.getTime()),
          status: "SUCCESS",
        };
      } catch (error) {
        return { status: "ERROR", data: null };
      }
    }),
});
