import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BillThisMonthChart from "./charts/BillThisMonthChart";
import AditionalBillInfo from "./chart-header/AdditionalBillInfo";
import { getLocale, getTranslations } from "next-intl/server";
import { caller } from "@/server";
import FinancialGoalHeader from "./chart-header/FinanicialGoalHeader";
import FinancialGoalsChart from "./charts/FinancialGoalsChart";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FinancialGoalSection = async ({ currency }: { currency: string }) => {
  const translation = getTranslations("Dashboard");
  const response = caller.dashboard.getFinancialGoals();
  const lang = getLocale();
  const [t, data, locale] = await Promise.all([translation, response, lang]);

  return (
    <Card className="w-[100%] mx-auto mb-8">
      <CardHeader>
        <CardTitle>{t("financialGoals")}</CardTitle>
        <CardDescription>{t("financialGoalsDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <FinancialGoalHeader data={data} currency={currency} />
        <FinancialGoalsChart chartData={data} />
        <div className="flex justify-end">
          <Link href={`/${locale}/financial-goals`} passHref>
            <Button>{t("showMore")}</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialGoalSection;
