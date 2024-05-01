"use client";

import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import useRemoveFinancialGoalHandler from "../hooks/useRemoveFinancialGoalHandler";
import { useTranslations } from "next-intl";

const RemoveFinancialGoalButton = ({ id }: { id: string }) => {
  const { mutate } = useRemoveFinancialGoalHandler();
  const t = useTranslations("FinancialGoals");

  return (
    <AlertDialogCancel asChild onClick={() => mutate(id)}>
      <Button className="bg-destructive">{t("remove")}</Button>
    </AlertDialogCancel>
  );
};

export default RemoveFinancialGoalButton;
