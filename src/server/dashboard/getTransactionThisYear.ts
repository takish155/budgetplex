import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { getServerSession } from "next-auth";
import prisma from "@/../lib/prisma";

export type Transactions = {
  data: {
    month: number;
    expense: number;
    income: number;
  }[];
  highestExpense: number;
  highestExpenseName: string;
  highestIncome: number;
  highestIncomeName: string;
};

export const getTransactionThisYearRouter = router({
  getTransactionThisYear: publicProcedure.query(async () => {
    try {
      const session = await getServerSession();
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

      const user = await prisma.user.findUnique({
        where: { email: session.user?.email! },
      });
      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

      let transactions: Transactions = {
        data: [],
        highestExpense: 0,
        highestExpenseName: "",
        highestIncome: 0,
        highestIncomeName: "",
      };
      const dateNow = new Date();

      for (let i = 0; i < 12; i++) {
        const date = new Date(dateNow.getFullYear(), i, 1);
        const lastDayOfDate = new Date(dateNow.getFullYear(), i + 1, 0);

        const expense = await prisma.expenses.findMany({
          where: { date: { gt: date, lt: lastDayOfDate }, userId: user.id },
        });
        const income = await prisma.income.findMany({
          where: { date: { gt: date, lt: lastDayOfDate }, userId: user.id },
        });

        const expenseTotal = expense.reduce((acc, cur) => {
          if (cur.amount > transactions.highestExpense) {
            transactions.highestExpense = cur.amount;
            transactions.highestExpenseName = cur.title;
          }

          return acc + cur.amount;
        }, 0);
        const incomeTotal = income.reduce((acc, cur) => {
          if (cur.amount > transactions.highestIncome) {
            transactions.highestIncome = cur.amount;
            transactions.highestIncomeName = cur.title;
          }

          return acc + cur.amount;
        }, 0);

        transactions.data.push({
          month: i,
          expense: expenseTotal,
          income: incomeTotal,
        });
      }

      const totalExpenses = transactions.data.reduce(
        (acc, cur) => acc + cur.expense,
        0
      );

      const totalIncome = transactions.data.reduce(
        (acc, cur) => acc + cur.income,
        0
      );

      return {
        totalExpenses,
        totalIncome,
        highestIncome: transactions.highestIncome,
        highestExpenses: transactions.highestExpense,
        expenseThisYear: transactions.data,
        highestIncomeName: transactions.highestIncomeName,
        highestExpenseName: transactions.highestExpenseName,
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: error });
    }
  }),
});
