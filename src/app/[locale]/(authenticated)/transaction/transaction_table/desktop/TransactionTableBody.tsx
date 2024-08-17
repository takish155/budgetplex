"use client";

import React from "react";
import TransactionTableRow from "./TransactionTableRow";
import { useTransactionContext } from "@/context/TransactionProvider";
import TableBodySkeleton from "./TableBodySkeleton";

const TransactionTableBody = () => {
  const { balanceDataHistory, balanceIsLoadingHistory, balanceIsErrorHistory } =
    useTransactionContext() || {};

  if (balanceIsLoadingHistory) {
    return <TableBodySkeleton cellCount={4} skeletonCount={5} />;
  }

  if (balanceIsErrorHistory) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      {balanceDataHistory?.data?.map((transactions) => {
        return (
          <TransactionTableRow
            transactions={transactions as any}
            key={transactions.id}
          />
        );
      })}
    </>
  );
};

export default TransactionTableBody;
