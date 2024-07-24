"use client";

import { useTranslations } from "next-intl";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import React from "react";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@/server";
import { calculatePercentages } from "../calculatePercentage";

type FinancialGoalsChartProps = inferProcedureOutput<
  AppRouter["dashboard"]["getFinancialGoals"]
>;

const FinancialGoalsChart = ({
  chartData,
}: {
  chartData: FinancialGoalsChartProps;
}) => {
  const t = useTranslations("Dashboard");
  const calculatedPercentages = calculatePercentages(chartData.chartData);

  // TODO: Only show name and percentage in the legend
  const chartConfig = {
    goalAmountPercentage: {
      label: t("goalProgress"),
      color: "red",
    },
    goalProgressPercentage: {
      label: t("goalAmount"),
      color: "blue",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart accessibilityLayer data={calculatedPercentages.slice(0, 3)}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="goalName"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="goalProgressPercentage"
          stackId="a"
          fill="#2563eb"
          radius={[4, 4, 0, 0]}
          barSize={30}
        />
        <Bar
          dataKey="goalAmountPercentage"
          fill="grey"
          stackId="a"
          radius={[0, 0, 4, 4]}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default FinancialGoalsChart;
