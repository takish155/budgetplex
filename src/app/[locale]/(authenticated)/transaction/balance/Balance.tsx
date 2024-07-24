"use client";

import React from "react";
import DisplayAmount from "../../../../../components/DisplayAmount";
import { useTranslations } from "next-intl";
import { useTransactionContext } from "@/context/TransactionProvider";

const Balance = () => {
  const { balanceData: data, balanceIsLoading } = useTransactionContext() || {};
  const t = useTranslations("Transaction");

  return (
    <section className="flex justify-between mb-11 flex-wrap gap-8">
      <DisplayAmount
        amount={data?.expenses ?? 0}
        type={t("expense")}
        isLoading={balanceIsLoading}
      />
      <DisplayAmount
        amount={data?.income ?? 0}
        type={t("income")}
        isLoading={balanceIsLoading}
      />
      <DisplayAmount
        isLoading={balanceIsLoading}
        amount={data?.income! - data?.expenses! ?? 0}
        type={t("remaining")}
      />
    </section>
  );
};

export default Balance;
