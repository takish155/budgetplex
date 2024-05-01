import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SheetFormSkeleton = ({ count }: { count: number }) => {
  return (
    <div>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="grid w-full max-w-sm items-center gap-1.5 mb-7"
        >
          <Skeleton className="w-[30%] h-[18px]" />
          <Skeleton className="w-[85%] h-[38px]" />
        </div>
      ))}
      <Skeleton className="w-[30%] h-[40px]" />
    </div>
  );
};

export default SheetFormSkeleton;
