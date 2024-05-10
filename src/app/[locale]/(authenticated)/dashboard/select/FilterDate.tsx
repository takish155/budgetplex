"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useTransactionContext } from "@/context/TransactionProvider";
import { dateToString } from "@/lib/dateToString";
import { useLocale } from "next-intl";

const FilterDate = () => {
  const { handleChangeParams, date } = useTransactionContext() || {};
  if (!handleChangeParams) return null;

  return (
    <>
      <div className="w-[100%] flex justify-between mt-4">
        <Button
          variant={"secondary"}
          onClick={() => {
            handleChangeParams("date", parseInt(date ?? "0") - 1 + "");
          }}
        >
          Last Month
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => {
            handleChangeParams("date", parseInt(date ?? "0") + 1 + "");
          }}
        >
          Next Month
        </Button>
      </div>
    </>
  );
};

export default FilterDate;
