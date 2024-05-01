import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const FinanncialGoalSkeleton = () => {
  return (
    <div className="flex justify-between flex-wrap">
      {[11321, 33123, 321312, 5231312, 61313].map((skeleton) => {
        return (
          <Skeleton
            key={skeleton}
            className="max-w-[500px] h-[200px] mb-8 w-[40%]"
          />
        );
      })}
    </div>
  );
};

export default FinanncialGoalSkeleton;
