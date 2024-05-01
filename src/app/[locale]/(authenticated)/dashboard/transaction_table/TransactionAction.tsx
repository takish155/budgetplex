import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import UpdateTransactionForm from "./UpdateTransactionForm";
import { TransactionData } from "../types/transactionData.type";
import { useTranslations } from "next-intl";

const TransactionAction = ({ data }: { data: TransactionData }) => {
  const t = useTranslations("Dashboard");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"link"}>
          <Info />
          <p className="sr-only">{t("transactionInfo")}</p>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-10">
          <SheetTitle>{t("transactionInfo")}</SheetTitle>
        </SheetHeader>
        <UpdateTransactionForm {...data} />
      </SheetContent>
    </Sheet>
  );
};

export default TransactionAction;
