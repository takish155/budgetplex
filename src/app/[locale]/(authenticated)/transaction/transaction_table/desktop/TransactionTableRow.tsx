"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TableCell, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import React, { memo } from "react";
import { TransactionData } from "../../types/transactionData.type";
import TransactionAction from "../TransactionAction";
import { useCurrencySign } from "@/context/CurrrencySignProvider";
import { formatToMoney } from "@/lib/formatToMoney";

interface TransactionTableRowProps {
  transactions: TransactionData;
}

const TransactionTableRow = ({ transactions }: TransactionTableRowProps) => {
  const c = useTranslations("AddTransaction");
  const currencySign = useCurrencySign();

  return (
    <HoverCard key={transactions.date.toString()}>
      <HoverCardTrigger asChild>
        <TableRow>
          <TableCell className="font-semibold">{transactions.title}</TableCell>
          <TableCell>{c(transactions.category)}</TableCell>
          <TableCell
            className={
              transactions.type === "income" ? "text-green-500" : "text-red-500"
            }
          >
            {formatToMoney(transactions.amount, currencySign)}
          </TableCell>
          <TableCell>
            <TransactionAction data={transactions} />
          </TableCell>
          <HoverCardContent>{transactions.description}</HoverCardContent>
        </TableRow>
      </HoverCardTrigger>
    </HoverCard>
  );
};

export default memo(TransactionTableRow);
