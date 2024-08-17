import { Table } from "@/components/ui/table";
import React from "react";
import TransactionTableHeader from "../transaction_table/desktop/TransactionTableHeader";
import dynamic from "next/dynamic";
import TableBodySkeleton from "../transaction_table/desktop/TableBodySkeleton";

const TransactionTableBody = dynamic(
  () => import("../transaction_table/desktop/TransactionTableBody"),
  {
    ssr: false,
    loading: () => <TableBodySkeleton cellCount={4} skeletonCount={5} />,
  }
);

const TransactionDesktopPage = () => {
  return (
    <section className="max-md:hidden">
      <Table>
        <TransactionTableHeader />
        <TransactionTableBody />
      </Table>
    </section>
  );
};

export default TransactionDesktopPage;
