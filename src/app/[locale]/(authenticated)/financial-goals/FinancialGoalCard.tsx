"use client";

import React, { memo } from "react";
import { FinancialGoals } from "./types/financialGoal.type";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteIcon, Info, Trash, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { formatToMoney } from "@/lib/formatToMoney";
import { calculateAmountToProgress } from "@/lib/calculateAmountToProgress";
import AddProgressModal from "./modal/AddProgressModal";
import RemoveFinancialGoalModal from "./modal/RemoveFinancialGoalModal";
import UpdateFinancialGoalSheet from "./modal/UpdateFinancialGoalSheet";
import PlanMonthlyForm from "./form/PlanMonthlyForm";
import { useCurrencySign } from "@/context/CurrrencySignProvider";

const FinancialGoalCard = ({ data }: { data: FinancialGoals }) => {
  const t = useTranslations("FinancialGoals");
  const currencySign = useCurrencySign();

  return (
    <Card className="min-w-[280px] max-w-[500px] mb-8 w-[40%]">
      <section className="pt-4 px-4 flex justify-between">
        <div>
          <h3 className="text-miniheader font-medium">{data.goalName}</h3>
          <p className="font-semibold italic">
            {t.rich("until", {
              date: () => (
                <span className="text-red-500">
                  {data.goalDeadline.toLocaleDateString()}
                </span>
              ),
            })}
          </p>
        </div>
        <div>
          <RemoveFinancialGoalModal id={data.id} goalName={data.goalName} />
          <UpdateFinancialGoalSheet data={data} />
        </div>
      </section>
      <section className="p-4">
        <p className="mb-4 font-light">{data.goalDescription}</p>
        <Progress
          value={calculateAmountToProgress(data.goalProgress, data.goalAmount)}
          className="mb-7"
        />
        <section className="flex justify-between items-center flex-wrap gap-4 mb-4">
          <AddProgressModal id={data.id} goalName={data.goalName} />
          <p className="text-right font-semibold">
            {formatToMoney(data.goalProgress, currencySign)} /{" "}
            {formatToMoney(data.goalAmount, currencySign)}
          </p>
        </section>
      </section>
    </Card>
  );
};

export default memo(FinancialGoalCard);
