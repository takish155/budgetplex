import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddBillForm from "../forms/AddBillForm";
import { useTranslations } from "next-intl";

const AddBillModal = () => {
  const t = useTranslations("BillInfo");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <p className="sr-only">{t("addBill")}</p>
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-10">
          <SheetTitle>{t("addBill")}</SheetTitle>
          <SheetDescription>{t("addBillDescription")}</SheetDescription>
        </SheetHeader>
        <AddBillForm />
      </SheetContent>
    </Sheet>
  );
};

export default AddBillModal;
