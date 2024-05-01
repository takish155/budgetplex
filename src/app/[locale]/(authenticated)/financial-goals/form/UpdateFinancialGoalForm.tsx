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
import { FinancialGoals } from "../types/financialGoal.type";
import useUpdateFinancialGoalHandler from "../hooks/useUpdateFinancialGoalHandler";
import Spinner from "@/components/Spinner";
import { Textarea } from "@/components/ui/textarea";
import PlanMonthlyForm from "./PlanMonthlyForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UpdateFinancialGoalForm = ({ data }: { data: FinancialGoals }) => {
  const t = useTranslations("FinancialGoals");
  const { control, errors, handleSubmit, isPending, mutate, register } =
    useUpdateFinancialGoalHandler();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("updateGoal", { goalName: data.goalName })}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit((formData) =>
            mutate({ data: formData, id: data.id })
          )}
        >
          <FormField htmlFor="goalName" placeholder={t("goalName")}>
            <Input {...register("goalName")} defaultValue={data.goalName} />
            {errors.goalName && (
              <p className="text-red-500 text-sm">
                {t(errors.goalName.message as AddFinancialGoalErrors)}
              </p>
            )}
          </FormField>
          <FormField htmlFor="goalAmount" placeholder={t("goalAmount")}>
            <Input
              defaultValue={data.goalAmount}
              {...register("goalAmount", { valueAsNumber: true })}
            />
            {errors.goalAmount && (
              <p className="text-red-500 text-sm">
                {t(errors.goalAmount.message as AddFinancialGoalErrors)}
              </p>
            )}
          </FormField>
          <FormField htmlFor="progressAmount" placeholder={t("progressValue")}>
            <Input
              defaultValue={data.goalProgress}
              {...register("progressAmount", { valueAsNumber: true })}
            />
            {errors.goalAmount && (
              <p className="text-red-500 text-sm">
                {t(errors.progressAmount?.message as AddFinancialGoalErrors)}
              </p>
            )}
          </FormField>
          <FormField
            htmlFor="goalDescription"
            placeholder={t("goalDescription")}
          >
            <Textarea
              {...register("goalDescription")}
              defaultValue={data.goalDescription ?? ""}
            />
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
              defaultValue={data.goalDeadline}
              render={({ field: { onChange, value } }) => (
                <DatePicker onChange={onChange} value={value} />
              )}
            />
            {errors.goalDeadline && (
              <p className="text-red-500 text-sm">
                {t(errors.goalDeadline.message as AddFinancialGoalErrors)}
              </p>
            )}
          </FormField>
          {!isPending ? (
            <Button type="submit" className="mt-4">
              {t("updateGoal")}
            </Button>
          ) : (
            <Spinner />
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateFinancialGoalForm;
