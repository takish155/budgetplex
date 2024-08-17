"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useTransactionContext } from "@/context/TransactionProvider";
import FormField from "@/components/FormField";

const SelectTransactionType = () => {
  const t = useTranslations("AddTransaction");
  const { handleChangeParams, transactionType } = useTransactionContext() || {};
  if (!handleChangeParams) return null;

  return (
    <FormField htmlFor="transactionType" placeholder={t("transactionType")}>
      <Select
        value={transactionType ?? "all"}
        onValueChange={(e) => {
          handleChangeParams("transactionType", e);
        }}
      >
        <SelectTrigger className="w-[180px]" id="transactionType">
          <SelectValue placeholder={t("transactionType")} />
        </SelectTrigger>
        <SelectContent defaultValue="all">
          <SelectItem value="all">{t("all")}</SelectItem>
          <SelectItem value="income">{t("income")}</SelectItem>
          <SelectItem value="expense">{t("expense")}</SelectItem>
        </SelectContent>
      </Select>
    </FormField>
  );
};

export default SelectTransactionType;
