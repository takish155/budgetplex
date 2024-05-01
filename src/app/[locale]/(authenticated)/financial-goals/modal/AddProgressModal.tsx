import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import React from "react";
import AddProgressToGoalForm from "../form/AddProgressToGoalForm";

const AddProgressModal = ({
  id,
  goalName,
}: {
  id: string;
  goalName: string;
}) => {
  const t = useTranslations("FinancialGoals");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{t("addProgress")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("addProgress")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("addProgressDescription", { goalName: goalName })}
          </AlertDialogDescription>
          <AddProgressToGoalForm id={id} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddProgressModal;
