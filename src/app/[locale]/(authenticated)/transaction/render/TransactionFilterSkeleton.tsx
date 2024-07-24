import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TransactionFilterSkeleton = () => {
  return (
    <div className="my-8">
      <Skeleton className="mb-4 h-[1.3rem] w-[4rem]" />
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <Skeleton className="w-[80px] h-[0.8rem] mb-1" />
          <Skeleton className="w-[170px] h-[2.3rem]" />
        </div>
        <div>
          <Skeleton className="w-[80px] h-[0.8rem] mb-1" />
          <Skeleton className="w-[170px] h-[2.3rem]" />
        </div>
      </div>
    </div>
  );
};

export default TransactionFilterSkeleton;
