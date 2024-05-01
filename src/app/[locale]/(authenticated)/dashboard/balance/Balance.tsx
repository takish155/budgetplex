import { caller } from "@/server";
import React from "react";
import DisplayAmount from "../../../../../components/DisplayAmount";
import { getTranslations } from "next-intl/server";
import FilterToLastMonthSection from "../../salary/component/FilterToLastMonthSection";
import FilterToNextMonthSection from "../../salary/component/FilterToNextMonthSection";

const Balance = async ({ index }: { index: string }) => {
  const data = await caller.balance.getBalance({
    index: Number(index),
  });
  const t = await getTranslations("Dashboard");

  return (
    <section className="flex justify-between mb-11 flex-wrap gap-8">
      <FilterToLastMonthSection />
      <FilterToNextMonthSection />
      <DisplayAmount amount={data.expenses} type={t("expense")} />
      <DisplayAmount amount={data.income} type={t("income")} />
      <DisplayAmount
        amount={data.income - data.expenses}
        type={t("remaining")}
      />
    </section>
  );
};

export default Balance;
