import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const MobileTableSkeleton = ({ count }: { count: number }) => {
  return (
    <div>
      {[...Array(count)].map((_, index) => (
        <Skeleton
          key={index}
          className="p-8 min-w-[280px] w-[90%] h-[100px] mx-auto rounded-lg mb-8"
        />
      ))}
    </div>
  );
};

export default MobileTableSkeleton;
