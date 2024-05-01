"use client";

import FormField from "@/components/FormField";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { DatePickerForUpdate } from "@/components/ui/date-picker-for-update";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import { AddShiftType } from "@/schema/addShiftSchema";
import useUpdateShiftHandler from "../hooks/useUpdateShiftHandler";
import SheetFormSkeleton from "../skeleton/SheetFormSkeleton";
import { trpc } from "@/context/QueryProvider";
import { ShiftDatePicker } from "@/components/ui/date-picker-for-shifts";
import { getSalaryDates } from "@/lib/getSalaryDates";

const UpdateShiftForm = ({ data, id }: { data: AddShiftType; id: string }) => {
  const t = useTranslations("Salary");
  const { control, errors, handleSubmit, mutate, register, isPending } =
    useUpdateShiftHandler(id);
  const {
    data: calendarData,
    isLoading,
    isError,
  } = trpc.balance.getUserSalarySettings.useQuery();
  if (isLoading) return <SheetFormSkeleton count={3} />;
  if (isError) return <div>Something went wrong</div>;
  const { startDate, endDate } = getSalaryDates(
    "startDay" in calendarData! ? calendarData.startDay : new Date().getDay()
  );

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      <FormField placeholder={t("shiftDate")} htmlFor="shiftDate">
        <Controller
          defaultValue={data.date}
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <ShiftDatePicker
              cycleStart={startDate}
              cycleEnd={endDate}
              onChange={onChange}
              value={value}
            />
          )}
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{t("shiftDateError")}</p>
        )}
      </FormField>
      <FormField placeholder={t("hoursWorkedHead")} htmlFor="hoursWorked">
        <Input
          defaultValue={data.hoursWorked}
          {...register("hoursWorked", { valueAsNumber: true })}
        />
        {errors.hoursWorked && (
          <p className="text-red-500 text-sm">{t("hoursWorkedError")}</p>
        )}
      </FormField>
      <FormField placeholder={t("overtimeWorkedHead")} htmlFor="overtimeHour">
        <Input
          defaultValue={data.overtimeHour}
          {...register("overtimeHour", { valueAsNumber: true })}
        />
        {errors.overtimeHour && (
          <p className="text-red-500 text-sm">{t("overtimeError")}</p>
        )}
      </FormField>

      {!isPending ? (
        <Button type="submit">{t("addShift")}</Button>
      ) : (
        <ClipLoader />
      )}
    </form>
  );
};

export default UpdateShiftForm;
