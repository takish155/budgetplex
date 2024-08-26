import { publicProcedure, router } from "../trpc";
import prisma from "../../../lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";
import { categoryEnum } from "@/schema/addTransactionSchema";

export const getTransactionHistoryRouter = router({
  getTransactionHistory: publicProcedure
    .input(
      z.object({
        index: z.number(),
        transactionType: z.string(),
        category: z.string(),
      })
    )
    .query(async (opts) => {
      console.log("transactiontype: " + opts.input.transactionType);
      console.log("category: " + opts.input.category);
      console.log("index: " + opts.input.index);
      try {
        const session = await auth();
        if (!session) {
          throw new Error("Unauthorized");
        }
        console.log(opts.input.transactionType);

        const data = await prisma.user.findUnique({
          where: { id: session.user?.id },
          select: {
            income: true,
            expenses: true,
          },
        });

        const date = new Date();
        if (opts.input.index) {
          date.setMonth(date.getMonth() + opts.input.index);
        }

        if (opts.input.transactionType === "income") {
          return {
            data: data?.income
              .map((transaction) => {
                return {
                  ...transaction,
                  type: "income",
                };
              })
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .filter((transaction) => {
                if (opts.input.category === "all") return true;
                return opts.input.category.includes(transaction.category);
              })
              .filter((transaction) => {
                return (
                  transaction.date.getMonth() === date.getMonth() &&
                  transaction.date.getFullYear() === date.getFullYear()
                );
              }),
          };
        }

        console.log(opts.input.transactionType ?? "yo");

        if (opts.input.transactionType === "expense") {
          return {
            data: data?.expenses
              .map((transaction) => {
                return {
                  ...transaction,
                  type: "expense",
                };
              })
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .filter((transaction) => {
                if (opts.input.category === "all") return true;
                return opts.input.category.includes(transaction.category);
              })
              .filter((transaction) => {
                return (
                  transaction.date.getMonth() === date.getMonth() &&
                  transaction.date.getFullYear() === date.getFullYear()
                );
              }),
          };
        }

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

            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .filter((transaction) => {
              if (opts.input.category === "all") return true;
              return transaction.category === opts.input.category;
            }),
          status: "SUCCESS",
        };
      } catch (error) {
        console.log("sup");
        console.error(error + "Real");
        return { status: "ERROR", data: null };
      }
    }),
});
