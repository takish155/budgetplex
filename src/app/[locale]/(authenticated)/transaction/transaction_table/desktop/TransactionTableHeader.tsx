import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import React from "react";

const TransactionTableHeader = () => {
  const t = useTranslations("Transaction");

  return (
    <TableHeader className="text-paragraph">
      <TableRow>
        <TableHead>{t("transactionTitle")}</TableHead>
        <TableHead>{t("transactionCategory")}</TableHead>
        <TableHead>{t("transactionAmount")}</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TransactionTableHeader;
