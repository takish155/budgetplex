import {
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";
import React from "react";

const SalaryDialogHeader = () => {
  const t = useTranslations("Salary");
  return (
    <AlertDialogHeader>
      <AlertDialogTitle>
        <h2>{t("salaryHistory")}</h2>
      </AlertDialogTitle>
      <AlertDialogDescription>
        {t("salaryHistoryDescription")}
      </AlertDialogDescription>
    </AlertDialogHeader>
  );
};

export default SalaryDialogHeader;
