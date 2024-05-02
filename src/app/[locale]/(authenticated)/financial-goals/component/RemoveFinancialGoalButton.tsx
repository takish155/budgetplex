"use client";

import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import useRemoveFinancialGoalHandler from "../hooks/useRemoveFinancialGoalHandler";
import { useTranslations } from "next-intl";
import Spinner from "@/components/Spinner";

const RemoveFinancialGoalButton = ({ id }: { id: string }) => {
  const { mutate, isPending } = useRemoveFinancialGoalHandler();
  const t = useTranslations("FinancialGoals");

  return (
    <AlertDialogCancel asChild onClick={() => mutate(id)}>
      {isPending ? (
        <Spinner />
      ) : (
        <Button className="bg-destructive">{t("remove")}</Button>
      )}
    </AlertDialogCancel>
  );
};

export default RemoveFinancialGoalButton;
