import { useLocale, useTranslations } from "next-intl";
import React from "react";
import SelectCategory from "../select/SelectCategory";
import SelectTransactionType from "../select/SelectTransactionType";
import FilterDate from "../select/FilterDate";
import { dateToString } from "@/lib/dateToString";
import { useTransactionContext } from "@/context/TransactionProvider";

const TransactionFilter = () => {
  const t = useTranslations("AddTransaction");

  return (
    <section className="my-8">
      <h3 className="text-paragraph mb-4 font-medium">{t("filter")}</h3>
      <div className="flex justify-between flex-wrap gap-4">
        <SelectCategory />
        <SelectTransactionType />
      </div>
    </section>
  );
};

export default TransactionFilter;
