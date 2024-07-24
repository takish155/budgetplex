import { router } from "../trpc";
import { getBillsThisMonthRouter } from "./getBillsThisMonth";
import { getFinancialGoalRouter } from "./getFinancialGoals";
import { getTransactionThisYearRouter } from "./getTransactionThisYear";

export const dashboardRouter = router({
  getTransactionThisYear: getTransactionThisYearRouter.getTransactionThisYear,
  getBillThisMonth: getBillsThisMonthRouter.getBillsThisMonth,
  getFinancialGoals: getFinancialGoalRouter.getFinancialGoals,
});
