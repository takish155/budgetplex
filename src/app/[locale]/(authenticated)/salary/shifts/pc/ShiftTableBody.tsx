import { TableBody } from "@/components/ui/table";
import React from "react";
import ShiftTableRow from "./ShiftTableRow";
import { ShiftTableProps } from "../../types/shift.type";

const ShiftTableBody = ({ shiftData }: { shiftData: ShiftTableProps }) => {
  const hourlyRate = shiftData.hourlyRate;
  const overtimeRate = shiftData.overtimeRate;

  return (
    <TableBody>
      {shiftData.shifts.map((shift) => {
        return (
          <ShiftTableRow
            key={shift.id}
            data={{
              ...shift,
              hourlyRate,
              overtimeRate,
              taxRate: shiftData.taxRate,
            }}
          />
        );
      })}
    </TableBody>
  );
};

export default ShiftTableBody;
