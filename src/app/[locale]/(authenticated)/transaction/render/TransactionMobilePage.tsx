"use client";

import React from "react";
import TransactionCard from "../transaction_table/mobile/TransactionCard";
import { TransactionData } from "../types/transactionData.type";
import { useTransactionContext } from "@/context/TransactionProvider";

const TransactionMobilePage = () => {
  const { balanceDataHistory } = useTransactionContext() || {};
  return (
    <section className="md:hidden">
      {balanceDataHistory?.data!.map((transaction) => {
        return (
          <TransactionCard
            data={transaction as TransactionData}
            key={transaction.id}
          />
        );
      })}
    </section>
  );
};

export default TransactionMobilePage;
