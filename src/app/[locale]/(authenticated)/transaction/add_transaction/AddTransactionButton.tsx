import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import TransactionForm from "../TransactionForm";

const AddTransactionButton = () => {
  const t = useTranslations("AddTransaction");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Plus />
          <p className="sr-only">{t("addTransaction")}</p>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-5">
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription>{t("description")}</SheetDescription>
        </SheetHeader>
        <TransactionForm />
      </SheetContent>
    </Sheet>
  );
};

export default AddTransactionButton;
