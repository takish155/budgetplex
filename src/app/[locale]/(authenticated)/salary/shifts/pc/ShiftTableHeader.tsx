import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import React from "react";

const ShiftTableHeader = () => {
  const t = useTranslations("Salary");
  return (
    <TableHeader>
      <TableRow>
        <TableHead>{t("shiftDate")}</TableHead>
        <TableHead>{t("hoursWorkedHead")}</TableHead>
        <TableHead>{t("overtimeWorkedHead")}</TableHead>
        <TableHead>{t("expectedEarningHead")}</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ShiftTableHeader;
