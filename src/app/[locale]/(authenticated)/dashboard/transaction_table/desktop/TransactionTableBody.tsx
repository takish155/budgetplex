"use client";

import { TableBody } from "@/components/ui/table";
import React from "react";
import TransactionTableRow from "./TransactionTableRow";
import { TransactionData } from "../../types/transactionData.type";
import { useTransactionData } from "@/states/transactionDataState";
import { trpc } from "@/context/QueryProvider";
import TableBodySkeleton from "./TableBodySkeleton";

const TransactionTableBody = () => {
  const { transactionData } = useTransactionData();

  return (
    <>
      {transactionData?.map((transactions) => {
        return (
          <TransactionTableRow
            transactions={transactions as TransactionData}
            key={transactions.id}
          />
        );
      })}
    </>
  );
};

export default TransactionTableBody;
