import React from "react";
import TransactionThisYearSection from "./TransactionThisYearSection";
import BillsSection from "./BillsSection";
import { caller } from "@/server";
import { getTranslations } from "next-intl/server";
import FinancialGoalSection from "./FInancialGoalSection";

const DashboardPage = async () => {
  const translation = getTranslations("Dashboard");
  const cur = caller.balance.getCurrencySign();
  const [t, currency] = await Promise.all([translation, cur]);

  return (
    <div className="w-[95%] mx-auto min-h-screen">
      <h2 className="text-miniheader font-semibold my-8">{t("title")}</h2>
      <section className="flex flex-wrap">
        <TransactionThisYearSection currency={currency} />
        <BillsSection currency={currency} />
        <FinancialGoalSection currency={currency} />
      </section>
    </div>
  );
};

export default DashboardPage;
