import { formatToMoney } from "@/lib/formatToMoney";
import React from "react";
import { Skeleton } from "./ui/skeleton";

interface DisplayAmountProps {
  type: string;
  amount: number;
  isLoading?: boolean;
}

const DisplayAmount = ({ amount, type, isLoading }: DisplayAmountProps) => {
  return (
    <div>
      <h3 className="text-paragraph font-light">{type}</h3>
      <h3 className="text-miniheader font-bold">
        {isLoading ? (
          <Skeleton className="h-[2rem] w-[8rem] mt-3" />
        ) : (
          formatToMoney(amount, "$")
        )}
      </h3>
    </div>
  );
};

export default DisplayAmount;
