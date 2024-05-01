import DisplayAmount from "@/components/DisplayAmount";
import DisplayDate from "@/components/DisplayDate";
import DisplayHour from "@/components/DisplayHours";
import { useTranslations } from "next-intl";
import React from "react";
import FilterToLastMonthSection from "../component/FilterToLastMonthSection";
import FilterToNextMonthSection from "../component/FilterToNextMonthSection";

interface SalaryStatisticProps {
  overtime: number;
  hourWorked: number;
  expectedSalary: number;
  startDate: Date;
  endDate: Date;
}

export const SalaryStatistic = ({ data }: { data: SalaryStatisticProps }) => {
  data.startDate.setDate(data.startDate.getDate() + 1);
  const t = useTranslations("Salary");
  return (
    <section className="flex justify-between mb-11 flex-wrap gap-8">
      <section className="w-full flex justify-between flex-wrap">
        <DisplayDate heading={t("salaryStartHeading")} date={data.startDate} />
        <DisplayDate heading={t("salaryEndHeading")} date={data.endDate} />
      </section>
      <FilterToLastMonthSection />
      <FilterToNextMonthSection />
      <DisplayHour name={t("hoursWorked")} hour={data.hourWorked} />
      <DisplayHour name={t("overtimeWorked")} hour={data.overtime} />
      <DisplayAmount type={t("expectedSalary")} amount={data.expectedSalary} />
    </section>
  );
};
