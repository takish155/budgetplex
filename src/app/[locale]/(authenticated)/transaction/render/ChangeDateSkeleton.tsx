import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ChangeDateSkeleton = () => {
  return (
    <div className="w-[100%] flex justify-between mt-4">
      <Skeleton className="w-[115px] h-[2.3rem]" />
      <Skeleton className="w-[115px] h-[2.3rem]" />
    </div>
  );
};

export default ChangeDateSkeleton;
