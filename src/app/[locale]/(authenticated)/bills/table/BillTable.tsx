"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import MobileTableSkeleton from "../../dashboard/transaction_table/MobileTableSkeleton";
import { BillData, useBillData } from "@/states/billDataState";
import useSessionMenu from "@/states/sessionMenuState";
import LargeScreenTableRender from "../render/LargeScreenTableRender";

const SmallScreenTableRender = dynamic(
  () => import("../render/SmallScreenTableRender"),
  { ssr: false, loading: () => <MobileTableSkeleton count={5} /> }
);

const BillTable = ({ data }: { data: BillData[] }) => {
  const { billData, setBillData } = useBillData();
  const { isMobile } = useSessionMenu();

  useEffect(() => {
    setBillData(data);
  }, [data, setBillData]);

  const currentDate = new Date();
  return (
    <>
      {!isMobile ? (
        <LargeScreenTableRender currentDate={currentDate} data={billData} />
      ) : (
        <SmallScreenTableRender currentDate={currentDate} data={billData} />
      )}
    </>
  );
};

export default BillTable;
