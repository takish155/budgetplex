import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import AddFinancialGoalForm from "../form/AddFinancialGoalForm";

const AddFinancialGoalSheet = () => {
  const t = useTranslations("FinancialGoals");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <PlusIcon />
          <p className="sr-only">{t("addGoal")}</p>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-8">
          <SheetTitle>{t("addGoal")}</SheetTitle>
          <SheetDescription>{t("addGoalDescription")}</SheetDescription>
        </SheetHeader>
        <AddFinancialGoalForm />
      </SheetContent>
    </Sheet>
  );
};

export default AddFinancialGoalSheet;
