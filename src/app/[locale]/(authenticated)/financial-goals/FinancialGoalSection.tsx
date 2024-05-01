import React from "react";
import { FinancialGoals } from "./types/financialGoal.type";
import FinancialGoalCard from "./FinancialGoalCard";

const FinancialGoalSection = ({ data }: { data: FinancialGoals[] }) => {
  return (
    <section className="flex justify-between flex-wrap">
      {data?.map((goal) => {
        return <FinancialGoalCard data={goal} key={goal.id} />;
      })}
    </section>
  );
};

export default FinancialGoalSection;
