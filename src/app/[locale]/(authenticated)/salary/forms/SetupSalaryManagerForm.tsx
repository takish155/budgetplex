"use client";

import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import React from "react";
import { useSetupSalaryManagerHandler } from "../hooks/useSetupSalaryManagerHandler";
import Spinner from "@/components/Spinner";
import { useCurrencySign } from "@/context/CurrrencySignProvider";
import { formatToMoney } from "@/lib/formatToMoney";

const SetupSalaryManagerForm = () => {
  const currencySign = useCurrencySign();
  const t = useTranslations("Salary");
  const { errors, handleSubmit, isPending, mutate, register, watch } =
    useSetupSalaryManagerHandler();
  const hourlyRate = watch("hourlyRate");
  const overtimeRate = watch("overtimeRate");

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      <FormField placeholder={t("hourlyRate")} htmlFor="hourlyRate">
        <Input
          id="hourlyRate"
          placeholder={t("hourlyRate")}
          {...register("hourlyRate", { valueAsNumber: true })}
        />
        {hourlyRate > 0 && (
          <p className="text-xl">{formatToMoney(hourlyRate, currencySign)}</p>
        )}
        {errors.hourlyRate && (
          <p className="text-red-500 text-sm">{t("invalidHourlyRateError")}</p>
        )}
      </FormField>
      <FormField placeholder={t("overtimeRate")} htmlFor="overtimeRate">
        <Input
          id="overtimeRate"
          placeholder={t("overtimeRate")}
          {...register("overtimeRate", { valueAsNumber: true })}
        />
        {overtimeRate > 0 && (
          <p className="text-xl">{formatToMoney(overtimeRate, currencySign)}</p>
        )}
        {errors.overtimeRate && (
          <p className="text-red-500 text-sm">
            {t("invalidOverTimeRateError")}
          </p>
        )}
      </FormField>
      <FormField placeholder={t("taxRate")} htmlFor="taxRate">
        <Input
          id="taxRate"
          placeholder={t("taxRate")}
          {...register("taxRate", { valueAsNumber: true })}
        />
        {errors.taxRate && (
          <p className="text-red-500 text-sm">{t("invalidTaxRateError")}</p>
        )}
      </FormField>
      <FormField placeholder={t("monthStartDate")} htmlFor="monthStartDate">
        <Input
          id="monthStartDate"
          placeholder={t("monthStartDate")}
          {...register("monthStartDate", { valueAsNumber: true })}
        />
        {errors.monthStartDate && (
          <p className="text-red-500 text-sm">
            {t("invalidMonthStartDateError")}
          </p>
        )}
      </FormField>
      <FormField placeholder={t("payday")} htmlFor="payday">
        <Input
          id="payday"
          placeholder={t("payday")}
          {...register("payday", { valueAsNumber: true })}
        />
        {errors.payday && (
          <p className="text-red-500 text-sm">{t("invalidPaydayDateError")}</p>
        )}
      </FormField>
      {isPending ? <Spinner /> : <Button>{t("configure")}</Button>}
    </form>
  );
};

export default SetupSalaryManagerForm;
