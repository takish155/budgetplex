"use client";

import FormField from "@/components/FormField";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import useAddProgressToGoalHandler from "../hooks/useAddProgressToGoalHandler";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import calculateMonthlyProgress from "@/lib/calculateMonthlyProgress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PlanMonthlyForm = ({ goalAmount }: { goalAmount: number }) => {
  const t = useTranslations("FinancialGoals");
  const [progressValue, setProgressValue] = useState(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("planMonthly")}</CardTitle>
        <CardDescription>{t("planMonthlyDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField htmlFor="progressValue" placeholder={t("planMonthlyInput")}>
          <Input
            type="number"
            onChange={(e) => setProgressValue(parseFloat(e.target.value))}
          />
          {progressValue > 0 && (
            <p>
              {t.rich("planMonthlyMessage", {
                months: calculateMonthlyProgress(goalAmount, progressValue),
                span: (text) => (
                  <span className="font-bold underline">{text}</span>
                ),
              })}
            </p>
          )}
        </FormField>
      </CardContent>
    </Card>
  );
};

export default PlanMonthlyForm;
