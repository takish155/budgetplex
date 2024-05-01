"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DatePickerForUpdate } from "@/components/ui/date-picker-for-update";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAddBill from "@/hooks/useAddBill";
import useUpdateBillHandler from "@/hooks/useUpdateBillHandler";
import { AddBillErrors, AddBillType } from "@/schema/addBillSchema";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import MarkAsUnpaidButton from "../buttons/MarkAsUnpaidButton";
import MarkAsPaidButton from "../buttons/MarkAsPaidButton";

const UpdateBillForm = ({
  data,
  id,
  isPaid,
}: {
  data: AddBillType;
  id: string;
  isPaid: boolean;
}) => {
  const t = useTranslations("BillInfo");
  const {
    control,
    errors,
    formStatus,
    handleSubmit,
    register,
    isUpdateBillPending,
    updateBill,
  } = useUpdateBillHandler(id);
  return (
    <form onSubmit={handleSubmit((data) => updateBill(data))}>
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
        <Input
          placeholder={t("billName")}
          {...register("billName")}
          defaultValue={data.billName}
        />
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
          defaultValue={data.billAmount}
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
          defaultValue={data.frequency}
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
          defaultValue={data.dueDate}
          render={({ field: { onChange, value } }) => (
            <DatePickerForUpdate onChange={onChange} value={value} />
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
        <Textarea
          {...register("billNote")}
          placeholder={t("billNote")}
          defaultValue={data.billNote}
        />
        {errors.billNote && (
          <p className="text-red-500 text-sm">
            {t(errors.billNote.message as AddBillErrors)}
          </p>
        )}
      </div>
      {!isUpdateBillPending ? (
        <div className="flex gap-4">
          <Button type="submit">{t("updateBill")}</Button>
          {isPaid ? (
            <MarkAsUnpaidButton billId={id} />
          ) : (
            <MarkAsPaidButton billId={id} />
          )}
        </div>
      ) : (
        <ClipLoader />
      )}
    </form>
  );
};

export default UpdateBillForm;
