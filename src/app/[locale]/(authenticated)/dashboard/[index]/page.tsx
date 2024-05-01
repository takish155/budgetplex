import React from "react";
import AddTransactionButton from "../add_transaction/AddTransactionButton";
import Balance from "../balance/Balance";
import TransactionHistorySection from "../TransactionHistorySection";
import { caller } from "@/server";
import { getLocale, getTranslations } from "next-intl/server";
import { TransactionData } from "../types/transactionData.type";

const page = async ({ params }: { params: { index: string } }) => {
  const t = await getTranslations("Dashboard");
  const locale = await getLocale();
  const response = await caller.balance.getTransactionHistory({
    index: Number(params.index),
  });

  const date = new Date();
  date.setMonth(date.getMonth() + Number(params.index));
  const formattedDate = date.toLocaleDateString(locale, {
    month: "long",
  });

  return (
    <section className="w-[95%] mx-auto">
      <h2 className="text-miniheader font-semibold mt-8 mb-5 flex justify-between">
        {`${formattedDate} ${t("transaction")}`} <AddTransactionButton />
      </h2>
      <Balance index={params.index} />
      <TransactionHistorySection data={response.data as TransactionData[]} />
    </section>
  );
};

export default page;
