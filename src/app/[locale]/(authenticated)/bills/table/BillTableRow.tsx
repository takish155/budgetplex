import { TableRow, TableCell, TableBody } from "@/components/ui/table";
import { BillData } from "@/states/billDataState";
import React, { memo } from "react";
import MarkAsUnpaidButton from "../buttons/MarkAsUnpaidButton";
import MarkAsPaidButton from "../buttons/MarkAsPaidButton";
import UpdateBillModal from "../modals/UpdateBillModal";
import DelateModal from "../modals/DeleteModal";
import { useTranslations } from "next-intl";

const BillTableRow = ({
  data,
  currentDate,
}: {
  data: BillData;
  currentDate: Date;
}) => {
  const t = useTranslations("BillInfo");

  return (
    <TableRow
      className={
        currentDate > data.dueDate && !data.isPaid ? "text-red-500" : ""
      }
    >
      <TableCell>{data.billName}</TableCell>
      <TableCell>${new Intl.NumberFormat().format(data.billAmount)}</TableCell>
      <TableCell>{data.dueDate.toLocaleDateString()}</TableCell>
      <TableCell>{data.isPaid ? t("paid") : t("unpaid")}</TableCell>
      <TableCell className="text-white flex justify-center">
        {data.isPaid && <MarkAsUnpaidButton billId={data.id} />}
        {!data.isPaid && <MarkAsPaidButton billId={data.id} />}
      </TableCell>
      <TableCell>
        <div className="flex justify-between">
          <UpdateBillModal
            billAmount={data.billAmount}
            billName={data.billName}
            billNote={data.billNote ?? ""}
            dueDate={data.dueDate}
            frequency={data.frequency}
            billId={data.id}
            isPaid={data.isPaid}
          />
          <DelateModal billId={data.id} billName={data.billName} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default memo(BillTableRow);
