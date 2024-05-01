import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

const TableBodySkeleton = ({
  skeletonCount,
  cellCount,
}: {
  skeletonCount: number;
  cellCount: number;
}) => {
  return (
    <TableRow>
      {[...Array(skeletonCount)].map((_, index) => (
        <TableRow key={index}>
          {[...Array(cellCount)].map((_, cellIndex) => {
            return (
              <TableCell key={cellIndex}>
                <Skeleton key={cellIndex} className="w-[100px] h-[25px]" />
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableRow>
  );
};

export default TableBodySkeleton;
