import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const UpdateSectionSkeleton = () => {
  return (
    <div>
      <Skeleton className="max-w-[700px] h-[200px] mb-8" />
      <Skeleton className="max-w-[700px] h-[200px] mb-8" />
      <Skeleton className="max-w-[700px] h-[200px]" />
    </div>
  );
};

export default UpdateSectionSkeleton;
