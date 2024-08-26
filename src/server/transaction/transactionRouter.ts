import { auth } from "@/auth";
import { publicProcedure, router } from "../trpc";
import { getBalanceRouter } from "./getBalance";
import { getBillInfoRouter } from "./getBillInfo";
import { getBillInfoDataRouter } from "./getBillInfoData";
import { getSalaryDataRouter } from "./getSalaryData";
import { getSalaryHistoryRouter } from "./getSalaryHistory";
import { getTransactionHistoryRouter } from "./getTransactionHistory";
import { getTransactionInfoRouter } from "./getTransactionInfo";
import { getBillsThisMonthRouter } from "./getUnpaidBillsThisMonth";
import { getUserSalarySettingsRouter } from "./getUserSalarySettings";
import prisma from "../../../lib/prisma";
import { cookies } from "next/headers";

export const transactionRouter = router({
  getBalance: getBalanceRouter.getBalance,
  getTransactionHistory: getTransactionHistoryRouter.getTransactionHistory,
  getTransactionInfo: getTransactionInfoRouter.getTransactionInfo,
  getBillsThisMonth: getBillsThisMonthRouter.getBillsThisMonth,
  getBillInfo: getBillInfoRouter.getBillInfo,
  getBillInfoData: getBillInfoDataRouter.getBillInfoData,
  getSalaryData: getSalaryDataRouter.getSalaryData,
  getSalaryHistory: getSalaryHistoryRouter.getSalaryHistory,
  getUserSalarySettings: getUserSalarySettingsRouter.getUserSalarySettings,
  getCurrencySign: publicProcedure.query(async () => {
    try {
      const session = await auth();
      const cookieStore = cookies();

      if (!session) {
        throw new Error("Unauthorized");
      }
      const user = await prisma?.user.findUnique({
        where: { id: session.user?.id },
        select: { currencySign: true },
      });
      if (!user) {
        throw new Error("User not found");
      }

      cookieStore.set("BUDGETPEX_CURRENCY", user.currencySign);
      return user.currencySign;
    } catch (error) {
      return "$";
    }
  }),
});
