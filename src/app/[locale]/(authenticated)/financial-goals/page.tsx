import { caller } from "@/server";
import { getTranslations } from "next-intl/server";
import React from "react";
import AddFinancialGoalSheet from "./modal/AddFinancialGoalSheet";
import dynamic from "next/dynamic";
import FinanncialGoalSkeleton from "./component/FinanncialGoalSkeleton";

const FinancialGoalSection = dynamic(() => import("./FinancialGoalSection"), {
  ssr: false,
  loading: () => <FinanncialGoalSkeleton />,
});

const FinancialGoalPage = async () => {
  const t = await getTranslations("FinancialGoals");
  const response = await caller.financial_goals.getGoal();

  return (
    <article className="w-[95%] mx-auto mt-8">
      <div className="flex justify-between">
        <h2 className="text-miniheader font-semibold mb-8">{t("header")}</h2>
        <AddFinancialGoalSheet />
      </div>
      <FinancialGoalSection data={response.goals!} />
    </article>
  );
};

export default FinancialGoalPage;
