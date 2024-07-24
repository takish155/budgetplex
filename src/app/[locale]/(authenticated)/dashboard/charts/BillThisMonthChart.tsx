"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatToMoney } from "@/lib/formatToMoney";
import React from "react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@/server";

type BillThisMonthChartProps = inferProcedureOutput<
  AppRouter["dashboard"]["getBillThisMonth"]
>;
const chartConfig = {} satisfies ChartConfig;

const BillThisMonthChart = ({
  data,
  currency,
}: {
  data: BillThisMonthChartProps;
  currency: string;
}) => {
  return (
    <ChartContainer config={chartConfig} className="w-[60%] max-sm:w-full p-8">
      <BarChart
        className="w-full"
        accessibilityLayer
        data={data?.billsThisMonth!}
        layout="vertical"
      >
        <YAxis dataKey="billName" type="category" tickMargin={1} hide />
        <XAxis dataKey="billAmount" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              formatter={(e) => formatToMoney(e as number, currency)}
            />
          }
        />
        <Bar
          dataKey="billAmount"
          layout="vertical"
          radius={2}
          fill="#2563eb"
          className="min-h-[10px]"
        >
          <LabelList
            dataKey="billAmount"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
            formatter={(val: number) => formatToMoney(val, currency)}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default BillThisMonthChart;
