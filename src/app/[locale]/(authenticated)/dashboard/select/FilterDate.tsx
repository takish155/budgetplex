"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useTransactionContext } from "@/context/TransactionProvider";
import { dateToString } from "@/lib/dateToString";
import { useLocale, useTranslations } from "next-intl";

const FilterDate = () => {
  const { handleChangeParams, date } = useTransactionContext() || {};
  const t = useTranslations("Dashboard");
  if (!handleChangeParams) return null;

  return (
    <>
      <div className="w-[100%] flex justify-between mt-4 mb-10">
        <Button
          variant={"secondary"}
          onClick={() => {
            handleChangeParams("date", parseInt(date ?? "0") - 1 + "");
          }}
        >
          {t("lastMonth")}
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => {
            handleChangeParams("date", parseInt(date ?? "0") + 1 + "");
          }}
        >
          {t("nextMonth")}
        </Button>
      </div>
    </>
  );
};

export default FilterDate;
