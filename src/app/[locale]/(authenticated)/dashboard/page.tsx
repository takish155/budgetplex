import React from "react";
import TransactionThisYearSection from "./TransactionThisYearSection";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const BillsSection = dynamic(() => import("./BillsSection"));
const FinancialGoalSection = dynamic(() => import("./FInancialGoalSection"));

const DashboardPage = () => {
  const t = useTranslations("Dashboard");

  return (
    <div className="w-[95%] mx-auto min-h-screen">
      <h2 className="text-miniheader font-semibold my-8">{t("title")}</h2>
      <section className="flex flex-wrap">
        <TransactionThisYearSection />
        <BillsSection />
        <FinancialGoalSection />
      </section>
    </div>
  );
};

export default DashboardPage;
