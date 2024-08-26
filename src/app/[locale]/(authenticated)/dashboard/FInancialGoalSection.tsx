import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { caller } from "@/server";
import FinancialGoalHeader from "./chart-header/FinanicialGoalHeader";
import FinancialGoalsChart from "./charts/FinancialGoalsChart";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FinancialGoalSection = async () => {
  const translation = getTranslations("Dashboard");
  const response = caller.dashboard.getFinancialGoals();
  const [t, data] = await Promise.all([translation, response]);

  if (!data) return null;

  return (
    <Card className="w-[100%] mx-auto mb-8">
      <CardHeader>
        <CardTitle>{t("financialGoals")}</CardTitle>
        <CardDescription>{t("financialGoalsDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <FinancialGoalHeader data={data} currency={data.currency} />
        <FinancialGoalsChart chartData={data} />
        <div className="flex justify-end">
          <Link href={`/financial-goals`} passHref>
            <Button>{t("showMore")}</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialGoalSection;
