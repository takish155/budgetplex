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

const BillThisMonthHeader = ({
  monthlyExpense,
  remainingToPay,
  currency,
}: {
  monthlyExpense: number;
  remainingToPay: number;
  currency: string;
}) => {
  const t = useTranslations("Dashboard");

  return (
    <section className="flex justify-around flex-wrap gap-4 mb-6 w-[60%] max-sm:w-full">
      <Card className="w-[45%] max-sm:w-[100%]">
        <CardHeader>
          <CardTitle className="text-sm">{t("monthlyExpense")}</CardTitle>
          <CardDescription className="text-lg font-extrabold">
            {formatToMoney(monthlyExpense ?? 0, currency)}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-[45%] max-sm:w-[100%]">
        <CardHeader>
          <CardTitle className="text-sm">{t("remainingToPay")}</CardTitle>
          <CardDescription className="text-lg font-extrabold">
            {formatToMoney(remainingToPay ?? 0, currency)}
          </CardDescription>
        </CardHeader>
      </Card>
    </section>
  );
};

export default BillThisMonthHeader;
