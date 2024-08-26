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
import AdditionalTransactionInfo from "./chart-header/AdditionalTransactionInfo";

const TransactionThisYearSection = async () => {
  const translation = getTranslations("Dashboard");
  const res = caller.dashboard.getTransactionThisYear();
  const [t, data] = await Promise.all([translation, res]);

  return (
    <Card className="w-[100%] mx-auto mb-8">
      <CardHeader>
        <CardTitle>{t("transactionThisYear")}</CardTitle>
        <CardDescription>{t("transactionThisYearDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <TransactionThisYearHeader
          currency={data.currency}
          totalExpense={data?.totalExpenses ?? 0}
          totalIncome={data?.totalIncome ?? 0}
        />
        <div className="flex justify-around flex-wrap">
          <TransactionThisYearChart data={data} currency={data.currency} />
          {data.highestExpenseName && data.highestIncomeName ? (
            <AdditionalTransactionInfo
              data={{
                currency: data.currency,
                highestExpenses: data?.highestExpenses ?? 0,
                highestIncome: data?.highestIncome ?? 0,
                highestExpenseName: data?.highestExpenseName ?? "",
                highestIncomeName: data?.highestIncomeName ?? "",
              }}
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionThisYearSection;
