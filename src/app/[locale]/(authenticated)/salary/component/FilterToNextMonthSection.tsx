"use client";

import { Button } from "@/components/ui/button";
import useHandleDateFilter from "@/hooks/useHandleDateFilter";
import { useTranslations } from "next-intl";
import React from "react";

const FilterToNextMonthSection = () => {
  const t = useTranslations("Salary");
  const { handleNextMonth } = useHandleDateFilter();

  return (
    <section className="w-[45%] flex justify-end">
      <Button variant={"secondary"} onClick={handleNextMonth}>
        {t("nextMonth")}
      </Button>
    </section>
  );
};

export default FilterToNextMonthSection;
