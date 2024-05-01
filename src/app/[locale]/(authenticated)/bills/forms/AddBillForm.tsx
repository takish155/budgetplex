"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAddBill from "@/hooks/useAddBill";
import { AddBillErrors } from "@/schema/addBillSchema";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller } from "react-hook-form";

const AddBillForm = () => {
  const t = useTranslations("BillInfo");
  const {
    control,
    errors,
    formStatus,
    handleSubmit,
    isPending,
    mutate,
    register,
  } = useAddBill();
  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      {formStatus.message && (
        <Alert
          variant={formStatus.status === "ERROR" ? "destructive" : "default"}
          className="mb-5"
        >
          <AlertDescription>{formStatus.message}</AlertDescription>
        </Alert>
      )}
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="billName">{t("billName")}</Label>
        <Input placeholder={t("billName")} {...register("billName")} />
        {errors.billName && (
          <p className="text-red-500 text-sm">
            {t(errors.billName.message as AddBillErrors)}
          </p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="billAmount">{t("billAmount")}</Label>
        <Input
          placeholder={t("billAmount")}
          {...register("billAmount", { valueAsNumber: true })}
        />
        {errors.billAmount && (
          <p className="text-red-500 text-sm">
            {t(errors.billAmount.message as AddBillErrors)}
          </p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="frequency">{t("frequency")}</Label>
        <Input
          placeholder={t("frequency")}
          {...register("frequency", { valueAsNumber: true })}
        />
        {errors.frequency && (
          <p className="text-red-500 text-sm">
            {t(errors.frequency.message as AddBillErrors)}
          </p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="dueDate">{t("billDueDate")}</Label>
        <Controller
          control={control}
          name="dueDate"
          render={({ field: { onChange } }) => (
            <DatePicker onChange={onChange} />
          )}
        />
        {errors.dueDate && (
          <p className="text-red-500 text-sm">
            {t(errors.dueDate.message as AddBillErrors)}
          </p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
        <Label htmlFor="billNote">{t("billNote")}</Label>
        <Textarea {...register("billNote")} placeholder={t("billNote")} />
        {errors.billNote && (
          <p className="text-red-500 text-sm">
            {t(errors.billNote.message as AddBillErrors)}
          </p>
        )}
      </div>
      <Button type="submit">{t("add")}</Button>
    </form>
  );
};

export default AddBillForm;
