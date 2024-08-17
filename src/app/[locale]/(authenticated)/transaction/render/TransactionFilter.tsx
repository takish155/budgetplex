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
      <SelectCategory />
      <SelectTransactionType />
    </section>
  );
};

export default TransactionFilter;
