"use client";
import { useTransactionContext } from "@/context/TransactionProvider";
import { dateToString } from "@/lib/dateToString";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

const CurrentDate = () => {
  const { date } = useTransactionContext() || {};
  const t = useTranslations("AddTransaction");
  const locale = useLocale();

  const dateNow = new Date();
  const monthNow = dateNow.getMonth();
  dateNow.setMonth(monthNow + parseInt(date ?? "0"));
  const dateInString = dateToString(dateNow, locale, true);

  return <span>{dateInString}</span>;
};

export default CurrentDate;
