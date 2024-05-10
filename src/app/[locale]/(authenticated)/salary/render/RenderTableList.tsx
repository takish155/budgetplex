"use client";

import React from "react";
import { ShiftTableProps } from "../types/shift.type";
import dynamic from "next/dynamic";
import MobileTableSkeleton from "../../dashboard/transaction_table/MobileTableSkeleton";
import ShiftTable from "../shifts/pc/ShiftTable";

const MobileRenderShift = dynamic(() => import("./MobileRenderShift"), {
  ssr: false,
  loading: () => <MobileTableSkeleton count={5} className="md:hidden" />,
});

const RenderTableList = ({ data }: { data: ShiftTableProps }) => {
  return (
    <>
      <ShiftTable data={data} />
      <MobileRenderShift data={data} />
    </>
  );
};

export default RenderTableList;
