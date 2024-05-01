import { Table } from "@/components/ui/table";
import React from "react";
import ShiftTableHeader from "./ShiftTableHeader";
import { ShiftTableProps } from "../../types/shift.type";
import dynamic from "next/dynamic";
import TableBodySkeleton from "../../../dashboard/transaction_table/desktop/TableBodySkeleton";

const ShiftTableBody = dynamic(() => import("./ShiftTableBody"), {
  ssr: false,
  loading: () => <TableBodySkeleton cellCount={5} skeletonCount={5} />,
});

const ShiftTable = ({ data }: { data: ShiftTableProps }) => {
  return (
    <Table className="max-md:hidden">
      <ShiftTableHeader />
      <ShiftTableBody shiftData={data} />
    </Table>
  );
};

export default ShiftTable;
