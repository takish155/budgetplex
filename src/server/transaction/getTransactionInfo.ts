import { publicProcedure, router } from "../trpc";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import z from "zod";

export const getTransactionInfoRouter = router({
  getTransactionInfo: publicProcedure
    .input(z.string().min(1).max(1000))
    .query(async (opts) => {
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

        const income = await prisma.income.findUnique({
          where: { id: opts.input },
          select: {
            title: true,
            category: true,
            amount: true,
            date: true,
            description: true,
          },
        });

        const expense = await prisma.expenses.findUnique({
          where: { id: opts.input },
          select: {
            title: true,
            category: true,
            amount: true,
            date: true,
            description: true,
          },
        });

        if (income) {
          return { data: income, status: "SUCCESS", type: "income" };
        }

        if (expense) {
          return { data: expense, status: "SUCCESS", type: "expense" };
        }
        throw new Error("Transaction not found");
      } catch (err) {
        if (err instanceof Error) {
          return { message: err.message, status: "ERROR" };
        }
        return { message: "An error aquired", status: "ERROR" };
      }
    }),
});
