import React from "react";
import ShiftCard from "../shifts/mobile/ShiftCard";
import { caller } from "@/server";

const RenderSalaryHistoryList = async () => {
  const response = await caller.balance.getSalaryHistory();

  return (
    <>
      {response.data?.salaryHistory.map((salary) => {
        return (
          <ShiftCard
            key={salary.id}
            isSalary={true}
            data={{
              date: salary.date,
              hourlyRate: response.data.userSalarySettings.hourlyRate,
              overtimeRate: response.data.userSalarySettings.overtime,
              taxRate: response.data.userSalarySettings.taxRate,
              id: salary.id,
              hourWorked: salary.shifts.reduce(
                (acc, shift) => acc + shift.hourWorked,
                0
              ),
              overtime: salary.shifts.reduce(
                (acc, shift) => acc + shift.overtime,
                0
              ),
              salaryId: salary.id,
              userId: salary.userId,
            }}
          />
        );
      })}
    </>
  );
};

export default RenderSalaryHistoryList;
