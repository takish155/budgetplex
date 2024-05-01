"use client";

import React, { useEffect } from "react";
import TransactionDesktopPage from "./render/TransactionDesktopPage";
import dynamic from "next/dynamic";
import { TransactionData } from "./types/transactionData.type";
import MobileTableSkeleton from "./transaction_table/MobileTableSkeleton";
import useSessionMenu from "@/states/sessionMenuState";
import { useTransactionData } from "@/states/transactionDataState";

const TransactionMobilePage = dynamic(
  () => import("./render/TransactionMobilePage"),
  { ssr: false, loading: () => <MobileTableSkeleton count={5} /> }
);

const TransactionHistorySection = ({ data }: { data: TransactionData[] }) => {
  const { isMobile } = useSessionMenu();
  const { setTransactionData, transactionData } = useTransactionData();

  useEffect(() => {
    setTransactionData(data);
  }, [transactionData, data, setTransactionData]);

  return (
    <>{!isMobile ? <TransactionDesktopPage /> : <TransactionMobilePage />}</>
  );
};

export default TransactionHistorySection;
