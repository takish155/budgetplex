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

const TransactionThisYearHeader = ({
  totalExpense,
  totalIncome,
  currency,
}: {
  totalExpense: number;
  totalIncome: number;
  currency: string;
}) => {
  const t = useTranslations("Dashboard");

  return (
    <section className="flex justify-around flex-wrap gap-4 mb-6 w-[60%] max-sm:w-full">
      <Card className="w-[45%] max-sm:w-[100%]">
        <CardHeader>
          <CardTitle className="text-sm">{t("totalExpense")}</CardTitle>
          <CardDescription className="text-lg font-extrabold ">
            {formatToMoney(totalExpense ?? 0, currency)}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-[45%] max-sm:w-[100%]">
        <CardHeader>
          <CardTitle className="text-sm">{t("totalIncome")}</CardTitle>
          <CardDescription className="text-lg font-extrabold ">
            {formatToMoney(totalIncome ?? 0, currency)}
          </CardDescription>
        </CardHeader>
      </Card>
    </section>
  );
};

export default TransactionThisYearHeader;
