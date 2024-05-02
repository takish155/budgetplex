"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import React from "react";
import { Trash2 } from "lucide-react";
import RemoveFinancialGoalButton from "../component/RemoveFinancialGoalButton";
import { useDialogStates } from "@/states/dialogStates";

const RemoveFinancialGoalModal = ({
  id,
  goalName,
}: {
  id: string;
  goalName: string;
}) => {
  const t = useTranslations("FinancialGoals");
  const { isRemoveFinancialGoalModalOpen, toggleRemoveFinancialGoalModal } =
    useDialogStates();

  return (
    <AlertDialog open={isRemoveFinancialGoalModalOpen}>
      <AlertDialogTrigger
        asChild
        onClick={() => toggleRemoveFinancialGoalModal()}
      >
        <Button variant={"link"}>
          <Trash2 />
          <p className="sr-only">{t("removeGoal")}</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("removeGoalHeader", { goalName })}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("removeGoalConfirmation", { goalName })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            asChild
            onClick={() => toggleRemoveFinancialGoalModal()}
          >
            <Button variant={"outline"}>{t("cancel")}</Button>
          </AlertDialogCancel>
          <RemoveFinancialGoalButton id={id} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveFinancialGoalModal;
