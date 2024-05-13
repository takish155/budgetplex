"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import React, { memo } from "react";
import { ShiftTableRowProps } from "../../types/shift.type";
import UpdateShiftModal from "../../modal/UpdateShiftModal";
import { useCurrencySign } from "@/context/CurrrencySignProvider";
import { formatToMoney } from "@/lib/formatToMoney";

const ShiftTableRow = ({ data }: { data: ShiftTableRowProps }) => {
  const totalEarning =
    data.overtime * data.overtimeRate + data.hourWorked * data.hourlyRate;
  const totalEarningWithTax =
    totalEarning - (totalEarning * data.taxRate) / 100;
  const currencySign = useCurrencySign();

  return (
    <TableRow key={data.id}>
      <TableCell>{data.date.toLocaleDateString()}</TableCell>
      <TableCell>{data.hourWorked}</TableCell>
      <TableCell>{data.overtime}</TableCell>
      <TableCell>{formatToMoney(data.hourlyRate, currencySign)}</TableCell>
      <TableCell>
        <UpdateShiftModal
          data={{
            date: data.date,
            hoursWorked: data.hourWorked,
            overtimeHour: data.overtime,
          }}
          id={data.id}
        />
      </TableCell>
    </TableRow>
  );
};

export default memo(ShiftTableRow);
