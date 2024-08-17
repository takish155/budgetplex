"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import MobileTableSkeleton from "../../transaction/transaction_table/MobileTableSkeleton";
import { BillData, useBillData } from "@/states/billDataState";
import LargeScreenTableRender from "../render/LargeScreenTableRender";

const SmallScreenTableRender = dynamic(
  () => import("../render/SmallScreenTableRender"),
  {
    ssr: false,
    loading: () => <MobileTableSkeleton count={5} className="md:hidden mt-4" />,
  }
);

const BillTable = ({ data }: { data: BillData[] }) => {
  const { billData, setBillData } = useBillData();

  useEffect(() => {
    setBillData(data);
  }, [data, setBillData]);

  const currentDate = new Date();
  return (
    <>
      <LargeScreenTableRender currentDate={currentDate} data={billData} />
      <SmallScreenTableRender currentDate={currentDate} data={billData} />
    </>
  );
};

export default BillTable;
