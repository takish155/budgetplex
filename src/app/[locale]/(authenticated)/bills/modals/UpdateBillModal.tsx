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
import { useTranslations } from "next-intl";
import UpdateBillForm from "../forms/UpdateBillForm";
import { AddBillType } from "@/schema/addBillSchema";

interface UpdateBillModalProps extends AddBillType {
  billId: string;
  isPaid: boolean;
}

const UpdateBillModal = ({
  billAmount,
  billName,
  billNote,
  dueDate,
  frequency,
  billId,
  isPaid,
}: UpdateBillModalProps) => {
  const t = useTranslations("BillInfo");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"link"}>
          <Info />
          <p className="sr-only">{t("updateBill")}</p>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-10">
          <SheetTitle>{t("billInfo")}</SheetTitle>
        </SheetHeader>
        <UpdateBillForm
          data={{ billAmount, billName, billNote, dueDate, frequency }}
          id={billId}
          isPaid={isPaid}
        />
      </SheetContent>
    </Sheet>
  );
};

export default UpdateBillModal;
