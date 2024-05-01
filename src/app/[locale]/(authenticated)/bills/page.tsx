import React from "react";
import BillInfo from "./BillInfo";
import BillTable from "./table/BillTable";
import { caller } from "@/server";

const page = async () => {
  const response = await caller.balance.getBillsThisMonth();

  return (
    <article className="w-[95%] mx-auto mt-8">
      <BillInfo />
      <BillTable data={response.data!} />
    </article>
  );
};

export default page;
