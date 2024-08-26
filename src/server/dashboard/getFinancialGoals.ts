import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { auth } from "@/auth";
import prisma from "@/../lib/prisma";

export const getFinancialGoalRouter = router({
  getFinancialGoals: publicProcedure.query(async () => {
    try {
      const session = await auth();
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

      const user = await prisma?.user.findUnique({
        where: { id: session.user?.id },
        select: { finanicalGoals: true, currencySign: true },
      });
      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });
      const { finanicalGoals } = user;

      if (finanicalGoals.length === 0) {
        return null;
      }

      const mostExpensiveFinancialGoal = finanicalGoals.reduce((prev, cur) => {
        return prev.goalAmount > cur.goalAmount ? prev : cur;
      });

      const mostProgressedGoal = finanicalGoals.reduce((prev, cur) => {
        return prev.goalAmount % prev.goalProgress >
          cur.goalAmount % prev.goalProgress
          ? cur
          : prev;
      });

      return {
        currency: user.currencySign,
        mostExpensiveFinancialGoal: {
          title: mostExpensiveFinancialGoal.goalName,
          goalAmount: mostExpensiveFinancialGoal.goalAmount,
          progress: mostExpensiveFinancialGoal.goalProgress,
        },
        mostProgressedGoal: {
          title: mostProgressedGoal.goalName,
          goalAmount: mostProgressedGoal.goalAmount,
          progress: mostProgressedGoal.goalProgress,
        },
        chartData: finanicalGoals,
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: error });
    }
  }),
});
