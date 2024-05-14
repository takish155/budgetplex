"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useAddTransactionHandler from "@/app/[locale]/(authenticated)/dashboard/hooks/useAddTransactionHandler";
import { AddTransactionErrors } from "@/schema/addTransactionSchema";
import { Label } from "@radix-ui/react-label";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { formatToMoney } from "@/lib/formatToMoney";
import { useCurrencySign } from "@/context/CurrrencySignProvider";

const TransactionForm = () => {
  const currencySign = useCurrencySign();
  const t = useTranslations("AddTransaction");
  const { errors, handleSubmit, isPending, mutate, register, control, watch } =
    useAddTransactionHandler();
  const [amount, setAmount] = useState(0);
  const watchedAmount = watch("amount");

  const categoryList = [
    { value: "investment", label: t("investment") },
    { value: "utilities", label: t("utilities") },
    { value: "groceries", label: t("groceries") },
    { value: "transportation", label: t("transportation") },
    { value: "entertainment", label: t("entertainment") },
    { value: "diningOut", label: t("diningOut") },
    { value: "education", label: t("education") },
    { value: "health", label: t("health") },
    { value: "other", label: t("other") },
  ];

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="transactionTitle">{t("transactionTitle")}</Label>
        <Input placeholder={t("transactionTitle")} {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-sm">
            {t(errors.title.message as AddTransactionErrors)}
          </p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="amount">{t("amount")}</Label>
        <Input
          placeholder={t("amount")}
          {...register("amount", { valueAsNumber: true })}
        />
        {watchedAmount > 0 && (
          <p className="text-bold text-xl">
            {formatToMoney(watchedAmount, currencySign)}
          </p>
        )}
        {errors.amount && (
          <p className="text-red-500 text-sm">{t("invalidAmountError")}</p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-10">
        <Label htmlFor="note">{t("note")}</Label>
        <Textarea placeholder={t("note")} {...register("note")} />
        {errors.note && (
          <p className="text-red-500 text-sm">
            {t(errors.note.message as AddTransactionErrors)}
          </p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="transactionType">{t("transactionType")}</Label>
        <Controller
          name="transactionType"
          control={control} // control prop from useForm()
          render={({ field: { onChange, value } }) => (
            <Select
              value={value}
              onValueChange={(selectedValue) => {
                // Manually update the form state
                onChange(selectedValue);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("transactionType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">{t("income")}</SelectItem>
                <SelectItem value="expense">{t("expense")}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.transactionType && (
          <p className="text-red-500 text-sm">{t("transactionError")}</p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-11">
        <Label htmlFor="category">{t("category")}</Label>

        <Controller
          name="category"
          control={control} // control prop from useForm()
          render={({ field: { onChange, value } }) => (
            <Combobox
              data={categoryList}
              label={t("selectCategory")}
              category={t("searchCategory")}
              notFound={t("noFoundCategory")}
              onChange={onChange}
              value={value}
            />
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{t("categoryError")}</p>
        )}
      </div>
      {isPending ? (
        <Spinner />
      ) : (
        <Button type="submit">{t("addTransaction")}</Button>
      )}
    </form>
  );
};

export default TransactionForm;
