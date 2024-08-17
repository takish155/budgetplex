import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatToMoney } from "@/lib/formatToMoney";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

interface AdditionalTransactionInfoProps {
  highestExpenses: number;
  highestIncome: number;
  currency: string;
  highestExpenseName: string;
  highestIncomeName: string;
}

const AdditionalTransactionInfo = ({
  data,
}: {
  data: AdditionalTransactionInfoProps;
}) => {
  const t = useTranslations("Dashboard");
  const locale = useLocale();

  return (
    <section className="w-[35%] max-sm:w-full">
      <Card className="w-full mb-10 max-sm:mb-4">
        <CardHeader>
          <CardTitle className="text-sm">{t("highestExpense")}</CardTitle>
          <CardDescription className="text-lg font-extrabold ">
            {formatToMoney(data?.highestExpenses ?? 0, data.currency)}{" "}
            <span className="font-light text-sm">
              ({data.highestExpenseName})
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-full mb-10">
        <CardHeader>
          <CardTitle className="text-sm">{t("highestIncome")}</CardTitle>
          <CardDescription className="text-lg font-extrabold ">
            {formatToMoney(data?.highestIncome ?? 0, data.currency)}{" "}
            <span className="font-light text-sm">
              ({data.highestIncomeName})
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex justify-end">
        <Link href={`/${locale}/dashboard`} passHref>
          <Button>{t("showMore")}</Button>
        </Link>
      </div>
    </section>
  );
};

export default AdditionalTransactionInfo;
