"use client";

import { Button } from "@/components/ui/button";
import useHandleDateFilter from "@/hooks/useHandleDateFilter";
import { useTranslations } from "next-intl";
import React from "react";

const FilterToLastMonthSection = () => {
  const t = useTranslations("Salary");
  const { handleLastMonth } = useHandleDateFilter();

  return (
    <section className="w-[45%]">
      <Button variant={"secondary"} onClick={handleLastMonth}>
        {t("lastMonth")}
      </Button>
    </section>
  );
};

export default FilterToLastMonthSection;
