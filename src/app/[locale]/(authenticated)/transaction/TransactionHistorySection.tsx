import React from "react";
import TransactionDesktopPage from "./render/TransactionDesktopPage";
import dynamic from "next/dynamic";
import MobileTableSkeleton from "./transaction_table/MobileTableSkeleton";

const TransactionMobilePage = dynamic(
  () => import("./render/TransactionMobilePage"),
  {
    ssr: false,
    loading: () => <MobileTableSkeleton count={5} className="md:hidden" />,
  }
);

const TransactionHistorySection = () => {
  return (
    <>
      <TransactionDesktopPage />
      <TransactionMobilePage />
    </>
  );
};

export default TransactionHistorySection;
