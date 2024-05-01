"use client";

import FormField from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import React from "react";
import useAddFinancialGoalFormHandler from "../hooks/useAddFinancialGoalFormHandler";
import { Controller } from "react-hook-form";
import { DatePicker } from "@/components/ui/date-picker";
import { AddFinancialGoalErrors } from "../types/addFinancialGoalSchema";
import { Button } from "@/components/ui/button";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";

const AddFinancialGoalForm = () => {
  const t = useTranslations("FinancialGoals");
  const { control, errors, handleSubmit, isPending, mutate, register } =
    useAddFinancialGoalFormHandler();

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      <FormField htmlFor="goalName" placeholder={t("goalName")}>
        <Input {...register("goalName")} />
        {errors.goalName && (
          <p className="text-red-500 text-sm">
            {t(errors.goalName.message as AddFinancialGoalErrors)}
          </p>
        )}
      </FormField>
      <FormField htmlFor="goalAmount" placeholder={t("goalAmount")}>
        <Input {...register("goalAmount", { valueAsNumber: true })} />
        {errors.goalAmount && (
          <p className="text-red-500 text-sm">
            {t(errors.goalAmount.message as AddFinancialGoalErrors)}
          </p>
        )}
      </FormField>
      <FormField htmlFor="goalDescription" placeholder={t("goalDescription")}>
        <Input {...register("goalDescription")} />
        {errors.goalDescription && (
          <p className="text-red-500 text-sm">
            {t(errors.goalDescription.message as AddFinancialGoalErrors)}
          </p>
        )}
      </FormField>
      <FormField htmlFor="goalDeadline" placeholder={t("goalDeadline")}>
        <Controller
          control={control}
          name="goalDeadline"
          render={({ field: { onChange } }) => (
            <DatePicker onChange={onChange} />
          )}
        />
        {errors.goalDeadline && (
          <p className="text-red-500 text-sm">
            {t(errors.goalDeadline.message as AddFinancialGoalErrors)}
          </p>
        )}
      </FormField>
      <Button type="submit" className="mt-4">
        {t("addGoal")}
      </Button>
    </form>
  );
};

export default AddFinancialGoalForm;
