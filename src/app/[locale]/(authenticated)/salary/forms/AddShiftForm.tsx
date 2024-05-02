"use client";

import FormField from "@/components/FormField";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import useAddShiftHandler from "../hooks/useAddShiftHandler";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShiftDatePicker } from "@/components/ui/date-picker-for-shifts";
import { trpc } from "@/context/QueryProvider";
import { getSalaryDates } from "@/lib/getSalaryDates";
import SheetFormSkeleton from "../skeleton/SheetFormSkeleton";
import Spinner from "@/components/Spinner";

const AddShiftForm = () => {
  const t = useTranslations("Salary");
  const { control, errors, handleSubmit, mutate, register, isPending } =
    useAddShiftHandler();
  const { data, isLoading, isError } =
    trpc.balance.getUserSalarySettings.useQuery();
  if (isLoading) return <SheetFormSkeleton count={3} />;
  if (isError) return <div>Something went wrong</div>;

  const { startDate, endDate } = getSalaryDates(
    "startDay" in data! ? data.startDay : new Date().getDay()
  );

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      <FormField placeholder={t("shiftDate")} htmlFor="shiftDate">
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange } }) => (
            <ShiftDatePicker
              onChange={onChange}
              cycleStart={startDate}
              cycleEnd={endDate}
            />
          )}
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{t("shiftDateError")}</p>
        )}
      </FormField>
      <FormField placeholder={t("hoursWorkedHead")} htmlFor="hoursWorked">
        <Input {...register("hoursWorked", { valueAsNumber: true })} />
        {errors.hoursWorked && (
          <p className="text-red-500 text-sm">{t("hoursWorkedError")}</p>
        )}
      </FormField>
      <FormField placeholder={t("overtimeWorkedHead")} htmlFor="overtimeHour">
        <Input {...register("overtimeHour", { valueAsNumber: true })} />
        {errors.overtimeHour && (
          <p className="text-red-500 text-sm">{t("overtimeError")}</p>
        )}
      </FormField>

      {!isPending ? (
        <Button type="submit">{t("addShift")}</Button>
      ) : (
        <Spinner />
      )}
    </form>
  );
};

export default AddShiftForm;
