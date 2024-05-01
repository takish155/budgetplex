import { router } from "../trpc";
import { getBalanceRouter } from "./getBalance";
import { getBillInfoRouter } from "./getBillInfo";
import { getBillInfoDataRouter } from "./getBillInfoData";
import { getSalaryDataRouter } from "./getSalaryData";
import { getSalaryHistoryRouter } from "./getSalaryHistory";
import { getTransactionHistoryRouter } from "./getTransactionHistory";
import { getTransactionInfoRouter } from "./getTransactionInfo";
import { getBillsThisMonthRouter } from "./getUnpaidBillsThisMonth";
import { getUserSalarySettingsRouter } from "./getUserSalarySettings";

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
});
