import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatToMoney } from "@/lib/formatToMoney";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

interface AditionalBillInfoProps {
  highestBill: number;
  overdueBillTotal: number;
  currency: string;
  highestBillName: string;
}

const AditionalBillInfo = ({ data }: { data: AditionalBillInfoProps }) => {
  const t = useTranslations("Dashboard");

  return (
    <section className="w-[35%] max-sm:w-full">
      <Card className="w-full mb-10 max-sm:mb-4">
        <CardHeader>
          <CardTitle className="text-sm">{t("highestBill")}</CardTitle>
          <CardDescription className="text-lg font-extrabold ">
            {formatToMoney(data?.highestBill ?? 0, data.currency)}{" "}
            <span className="font-light text-sm">({data.highestBillName})</span>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-full mb-10">
        <CardHeader>
          <CardTitle className="text-sm">{t("overdueBills")}</CardTitle>
          <CardDescription className="text-lg font-extrabold text-destructive">
            {formatToMoney(data?.overdueBillTotal ?? 0, data.currency)}{" "}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex justify-end">
        <Link href={`/bills`} passHref>
          <Button>{t("showMore")}</Button>
        </Link>
      </div>
    </section>
  );
};

export default AditionalBillInfo;
