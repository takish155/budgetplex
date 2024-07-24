import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TransactionThisYearChart from "./charts/TransactionThisYearChart";
import { getTranslations } from "next-intl/server";
import { caller } from "@/server";
import TransactionThisYearHeader from "./chart-header/TransactionThisYearHeader";
import { formatToMoney } from "@/lib/formatToMoney";
import AdditionalTransactionInfo from "./chart-header/AdditionalTransactionInfo";

const TransactionThisYearSection = async ({
  currency,
}: {
  currency: string;
}) => {
  const translation = getTranslations("Dashboard");
  const res = caller.dashboard.getTransactionThisYear();
  const [t, data] = await Promise.all([translation, res]);
  // to do: fix the overlapping layout

  return (
    <Card className="w-[100%] mx-auto mb-8">
      <CardHeader>
        <CardTitle>{t("transactionThisYear")}</CardTitle>
        <CardDescription>{t("transactionThisYearDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <TransactionThisYearHeader
          currency={currency}
          totalExpense={data?.totalExpenses ?? 0}
          totalIncome={data?.totalIncome ?? 0}
        />
        <div className="flex justify-around flex-wrap">
          <TransactionThisYearChart data={data} currency={currency} />
          <AdditionalTransactionInfo
            data={{
              currency: currency,
              highestExpenses: data?.highestExpenses ?? 0,
              highestIncome: data?.highestIncome ?? 0,
              highestExpenseName: data?.highestExpenseName ?? "",
              highestIncomeName: data?.highestIncomeName ?? "",
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionThisYearSection;
