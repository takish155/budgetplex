import { trpc } from "@/context/QueryProvider";
import { TransactionCategory } from "@/schema/addTransactionSchema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const useTransaction = () => {
  const searchParans = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const date = searchParans.get("date");
  const category = searchParans.get("category");
  const transactionType = searchParans.get("transactionType");

  const handleChangeParams = (
    type: "date" | "category" | "transactionType",
    value: string
  ) => {
    if (type === "date") {
      router.push(
        `${pathname}?date=${value}&category=${
          category ?? "all"
        }&transactionType=${transactionType ?? "all"}`
      );
    }
    if (type === "category") {
      router.push(
        `${pathname}?date=${date ?? 0}&category=${value}&transactionType=${
          transactionType ?? "all"
        }`
      );
    }
    if (type === "transactionType") {
      router.push(
        `${pathname}?date=${date ?? 0}&category=${
          category ?? "all"
        }&transactionType=${value}`
      );
    }
  };

  const {
    refetch: refetchBalance,
    data: balanceData,
    isLoading: balanceIsLoading,
    isError: balanceIsError,
  } = trpc.balance.getBalance.useQuery({
    index: date ? parseInt(date) : 0,
    category: category ?? "all",
  });

  const {
    refetch: refetchBalanceHistory,
    data: balanceDataHistory,
    isLoading: balanceIsLoadingHistory,
    isError: balanceIsErrorHistory,
  } = trpc.balance.getTransactionHistory.useQuery({
    index: parseInt(date ?? "0"),
    category: category ?? "all",
    transactionType: transactionType ?? "all",
  });

  useEffect(() => {
    if (date || category || transactionType) {
      refetchBalance();
      refetchBalanceHistory();
    }
  }, [date, category, refetchBalance, refetchBalanceHistory, transactionType]);

  return {
    balanceData,
    balanceIsLoading,
    balanceIsError,
    balanceDataHistory,
    balanceIsLoadingHistory,
    balanceIsErrorHistory,
    handleChangeParams,
    date,
    category,
    transactionType,
  };
};

export default useTransaction;

export type UseTransaction = ReturnType<typeof useTransaction>;
