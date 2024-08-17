import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { formatToMoney } from "@/lib/formatToMoney";

interface FinancialGoalHeaderProps {
  mostExpensiveFinancialGoal: {
    title: string;
    goalAmount: number;
    progress: number;
  };
  mostProgressedGoal: {
    title: string;
    goalAmount: number;
    progress: number;
  };
}

const FinancialGoalHeader = ({
  data,
  currency,
}: {
  data: FinancialGoalHeaderProps;
  currency: string;
}) => {
  const t = useTranslations("Dashboard");

  return (
    <section className="flex justify-around flex-wrap gap-4 mb-10 w-[60%] max-sm:w-full">
      <Card className="w-[45%] max-sm:w-[100%]">
        <CardHeader>
          <CardTitle className="text-sm">{t("mostExpensiveGoal")}</CardTitle>
          <CardDescription className="text-lg font-extrabold">
            {formatToMoney(
              data.mostExpensiveFinancialGoal.goalAmount ?? 0,
              currency
            )}
            <span className="text-sm font-normal">
              /{" "}
              {formatToMoney(
                data.mostExpensiveFinancialGoal.progress ?? 0,
                currency
              )}
              ({data.mostExpensiveFinancialGoal.title})
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-[45%] max-sm:w-[100%]">
        <CardHeader>
          <CardTitle className="text-sm">{t("highestProgressGoal")}</CardTitle>
          <CardDescription className="text-lg font-extrabold">
            {formatToMoney(data.mostProgressedGoal.progress ?? 0, currency)}

            <span className="text-sm font-normal">
              /{" "}
              {formatToMoney(data.mostProgressedGoal.goalAmount ?? 0, currency)}{" "}
              ({data.mostProgressedGoal.title})
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
    </section>
  );
};

export default FinancialGoalHeader;
