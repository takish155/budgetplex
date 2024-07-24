"use client";

import { ChartContainer } from "@/components/ui/chart";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { type ChartConfig } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useTranslations } from "next-intl";
import TransactionThisYearHeader from "../chart-header/TransactionThisYearHeader";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@/server";

type TransactionThisYearChartProps = inferProcedureOutput<
  AppRouter["dashboard"]["getTransactionThisYear"]
>;

const TransactionThisYearChart = ({
  data,
  currency,
}: {
  data: TransactionThisYearChartProps;
  currency: string;
}) => {
  const t = useTranslations("Dashboard");

  const chartConfig = {
    expense: {
      label: t("expense"),
      color: "red",
    },
    income: {
      label: t("income"),
      color: "green",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="w-[60%] max-sm:w-full p-8">
      <BarChart data={data?.expenseThisYear!}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => t(value.toString())}
        />
        <Bar dataKey="income" fill="var(--color-income)" radius={6} />
        <Bar dataKey="expense" fill="var(--color-expense)" radius={6} />
      </BarChart>
    </ChartContainer>
  );
};

export default TransactionThisYearChart;
