"use client";

import FormField from "@/components/FormField";
import { Input } from "@/components/ui/input";
import React from "react";
import useAddProgressToGoalHandler from "../hooks/useAddProgressToGoalHandler";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";

const AddProgressToGoalForm = ({ id }: { id: string }) => {
  const { isPending, mutate, progressValue, setProgressValue } =
    useAddProgressToGoalHandler();
  const t = useTranslations("FinancialGoals");

  return (
    <form
      className="py-8"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ id: id, amount: progressValue });
      }}
    >
      <FormField htmlFor="progressValue" placeholder={t("progressValue")}>
        <Input
          type="number"
          onChange={(e) => setProgressValue(parseFloat(e.target.value))}
        />
      </FormField>
      <div className="flex gap-4">
        <AlertDialogCancel asChild className="bg-primary">
          {!isPending ? (
            <Button type="submit" variant={"default"}>
              {t("addProgress")}
            </Button>
          ) : (
            <Spinner />
          )}
        </AlertDialogCancel>
        <AlertDialogCancel asChild>
          <Button variant="outline">{t("cancel")}</Button>
        </AlertDialogCancel>
      </div>
    </form>
  );
};

export default AddProgressToGoalForm;
