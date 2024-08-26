import React from "react";
import AddTransactionButton from "./add_transaction/AddTransactionButton";
import Balance from "./balance/Balance";
import TransactionHistorySection from "./TransactionHistorySection";
import { TransactionContextProvider } from "@/context/TransactionProvider";
import { useTranslations } from "next-intl";
import CurrentDate from "./render/CurrentDate";
import FilterSection from "./FilterSection";

const page = () => {
  const t = useTranslations!("Transaction");

  return (
    <div className="w-[95%] mx-auto">
      <TransactionContextProvider>
        <section className="mt-8 mb-3 flex justify-between">
          <h2 className="text-miniheader font-semibold">
            {t("transaction")} (<CurrentDate />)
          </h2>
          <div className="flex gap-4">
            <FilterSection />
            <AddTransactionButton />
          </div>
        </section>
        <Balance />
        <TransactionHistorySection />
      </TransactionContextProvider>
    </div>
  );
};

export default page;
