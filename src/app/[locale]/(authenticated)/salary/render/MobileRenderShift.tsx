import React from "react";
import { ShiftTableProps } from "../types/shift.type";
import ShiftCard from "../shifts/mobile/ShiftCard";

const MobileRenderShift = ({
  data,
  isSalary = false,
}: {
  data: ShiftTableProps;
  isSalary?: boolean;
}) => {
  return (
    <section className={!isSalary ? "md:hidden" : ""}>
      {data.shifts.map((shift) => {
        return (
          <ShiftCard
            key={shift.id}
            isSalary={isSalary}
            data={{
              ...shift,
              hourlyRate: data.hourlyRate,
              overtimeRate: data.overtimeRate,
              taxRate: data.taxRate,
            }}
          />
        );
      })}
    </section>
  );
};

export default MobileRenderShift;
