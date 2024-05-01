"use client";

import useSessionMenu from "@/states/sessionMenuState";
import React, { useEffect } from "react";
import { ShiftTableProps } from "../types/shift.type";
import dynamic from "next/dynamic";
import MobileTableSkeleton from "../../dashboard/transaction_table/MobileTableSkeleton";
import ShiftTable from "../shifts/pc/ShiftTable";

const MobileRenderShift = dynamic(() => import("./MobileRenderShift"), {
  ssr: false,
  loading: () => <MobileTableSkeleton count={5} />,
});

const RenderTableList = ({ data }: { data: ShiftTableProps }) => {
  const { isMobile } = useSessionMenu();

  return (
    <>
      {!isMobile ? (
        <ShiftTable data={data} />
      ) : (
        <MobileRenderShift data={data} />
      )}
    </>
  );
};

export default RenderTableList;
