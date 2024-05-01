import React from "react";
import TransactionCard from "../transaction_table/mobile/TransactionCard";
import { TransactionData } from "../types/transactionData.type";
import { useTransactionData } from "@/states/transactionDataState";

const TransactionMobilePage = () => {
  const { transactionData } = useTransactionData();
  return (
    <section className="md:hidden">
      {transactionData.map((transaction) => {
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
