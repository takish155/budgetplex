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
import { getTranslations } from "next-intl/server";
import { caller } from "@/server";
import BillThisMonthHeader from "./chart-header/BillThisMonthHeader";

const BillsSection = async () => {
  const translation = getTranslations("Dashboard");
  const response = caller.dashboard.getBillThisMonth();
  const [t, data] = await Promise.all([translation, response]);

  return (
    <Card className="w-[100%] mx-auto mb-8">
      <CardHeader>
        <CardTitle>{t("billsToPayThisMonth")}</CardTitle>
        <CardDescription>{t("billsToPayThisMonthDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <BillThisMonthHeader
          currency={data?.currency ?? "$"}
          monthlyExpense={data?.totalBillsToPay ?? 0}
          remainingToPay={data?.totalRemainingBillsToPay ?? 0}
        />
        <div className="flex justify-around flex-wrap">
          <BillThisMonthChart data={data} currency={data?.currency ?? "$"} />
          {data?.highestBill.billName ? (
            <AditionalBillInfo
              data={{
                currency: data?.currency ?? "$",
                highestBill: data?.highestBill.billAmount ?? 0,
                highestBillName: data?.highestBill.billName ?? "",
                overdueBillTotal: data?.overdueBillTotal ?? 0,
              }}
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default BillsSection;
