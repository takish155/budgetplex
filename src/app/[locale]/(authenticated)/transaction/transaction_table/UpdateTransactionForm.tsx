"use client";

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
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, Form } from "react-hook-form";
import { TransactionData } from "../types/transactionData.type";
import useDeleteTransactionHandler from "../hooks/useDeleteTransactionHandler";
import FormField from "@/components/FormField";
import { AddTransactionErrors } from "@/schema/addTransactionSchema";
import Spinner from "@/components/Spinner";
import { SheetClose } from "@/components/ui/sheet";
import { formatToMoney } from "@/lib/formatToMoney";
import { useCurrencySign } from "@/context/CurrrencySignProvider";
import useUpdateTransactionHandler from "../hooks/useUpdateTransactionHandler";

const UpdateTransactionForm = ({
  title,
  amount,
  description: note,
  type: transactionType,
  category,
  id,
}: TransactionData) => {
  const t = useTranslations("AddTransaction");
  const currencySign = useCurrencySign();

  const {
    errors,
    handleSubmit,
    register,
    control,
    updateTransaction,
    isUpdatePending,
    watch,
  } = useUpdateTransactionHandler(id);

  const { deleteTransaction, isDeletePending } =
    useDeleteTransactionHandler(id);
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
    <form onSubmit={handleSubmit((data) => updateTransaction(data))}>
      <FormField htmlFor="transactionTitle" placeholder={t("transactionTitle")}>
        <Input
          placeholder={t("transactionTitle")}
          {...register("title")}
          defaultValue={title}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">
            {t(errors.title?.message! as AddTransactionErrors)}
          </p>
        )}
      </FormField>
      <FormField htmlFor="amount" placeholder={t("amount")}>
        <Input
          placeholder={t("amount")}
          {...register("amount", { valueAsNumber: true })}
          defaultValue={amount}
        />
        {watchedAmount > 0 && (
          <p className="text-bold text-xl">
            {formatToMoney(watchedAmount, currencySign)}
          </p>
        )}
        {errors.amount && (
          <p className="text-red-500 text-sm">{t("invalidAmountError")}</p>
        )}
      </FormField>
      <FormField htmlFor="note" placeholder={t("note")}>
        <Textarea
          placeholder={t("note")}
          {...register("note")}
          defaultValue={note ?? ""}
        />
        {errors.note && (
          <p className="text-red-500 text-sm">
            {t(errors.note.message as AddTransactionErrors)}
          </p>
        )}
      </FormField>
      <FormField htmlFor="transactionType" placeholder={t("transactionType")}>
        <Controller
          defaultValue={transactionType as "expense" | "income"}
          name="transactionType"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              value={value}
              onValueChange={(selectedValue) => {
                onChange(selectedValue);
              }}
              defaultValue={transactionType}
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
      </FormField>
      <FormField htmlFor="category" placeholder={t("category")}>
        <Controller
          name="category"
          control={control} // control prop from useForm()
          defaultValue={category}
          render={({ field: { onChange } }) => (
            <Combobox
              data={categoryList}
              label={t("selectCategory")}
              category={t("searchCategory")}
              notFound={t("noFoundCategory")}
              onChange={onChange}
              value={category}
            />
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{t("categoryError")}</p>
        )}
      </FormField>
      {isDeletePending || isUpdatePending ? (
        <Spinner />
      ) : (
        <div className="flex gap-8 flex-wrap">
          <Button type="submit">{t("updateTransaction")}</Button>
          <Button
            variant={"destructive"}
            type="button"
            onClick={() => deleteTransaction()}
          >
            {t("deleteTransaction")}
          </Button>
          <SheetClose asChild>
            <Button variant={"outline"} type="button">
              {t("cancel")}
            </Button>
          </SheetClose>
        </div>
      )}
    </form>
  );
};

export default UpdateTransactionForm;
