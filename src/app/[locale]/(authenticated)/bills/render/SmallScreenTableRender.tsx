import { RenderBillTableProps } from "@/types/billData.types";
import React from "react";
import MobileBillCard from "../table/MobileBillCard";

const SmallScreenTableRender = ({ data }: RenderBillTableProps) => {
  return (
    <section className="lg:hidden">
      {data?.map((bills) => {
        return <MobileBillCard bills={bills} key={bills.id} />;
      })}
    </section>
  );
};

export default SmallScreenTableRender;
