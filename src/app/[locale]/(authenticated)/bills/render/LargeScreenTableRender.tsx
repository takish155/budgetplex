import { RenderBillTableProps } from "@/types/billData.types";
import { useTranslations } from "next-intl";
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dynamic from "next/dynamic";
import TableBodySkeleton from "../../transaction/transaction_table/desktop/TableBodySkeleton";

const BillTableRow = dynamic(() => import("../table/BillTableRow"), {
  ssr: false,
  loading: () => <TableBodySkeleton cellCount={7} skeletonCount={5} />,
});

const LargeScreenTableRender = ({
  data,
  currentDate,
}: RenderBillTableProps) => {
  const t = useTranslations("BillInfo");
  return (
    <Table className="max-lg:hidden">
      <TableHeader>
        <TableRow>
          <TableHead>{t("billName")}</TableHead>
          <TableHead>{t("billAmount")}</TableHead>
          <TableHead>{t("billDueDate")}</TableHead>
          <TableHead>{t("billStatus")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <p className="mt-4">{t("noBillYet")}</p>
        ) : (
          data.map((bills) => {
            return (
              <BillTableRow
                currentDate={currentDate}
                data={bills}
                key={bills.id}
              />
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

export default LargeScreenTableRender;
