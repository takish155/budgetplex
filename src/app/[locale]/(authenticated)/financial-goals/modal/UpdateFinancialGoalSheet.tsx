import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import UpdateFinancialGoalForm from "../form/UpdateFinancialGoalForm";
import { FinancialGoals } from "../types/financialGoal.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlanMonthlyForm from "../form/PlanMonthlyForm";

const UpdateFinancialGoalSheet = ({ data }: { data: FinancialGoals }) => {
  const t = useTranslations("FinancialGoals");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">
          <Info />
          <p className="sr-only">{t("updateGoal")}</p>
        </Button>
      </SheetTrigger>
      <SheetContent className="md:min-w-[500px]">
        <Tabs className="w-full pt-4">
          <TabsList
            defaultValue="updateFinancialGoal"
            className="grid w-full grid-cols-2"
          >
            <TabsTrigger value="updateFinancialGoal">
              {t("updateGoal")}
            </TabsTrigger>
            <TabsTrigger value="planMonthly">{t("planMonthly")}</TabsTrigger>
          </TabsList>
          <TabsContent value="updateFinancialGoal">
            <UpdateFinancialGoalForm data={data} />
          </TabsContent>
          <TabsContent value="planMonthly">
            <PlanMonthlyForm goalAmount={data.goalAmount - data.goalProgress} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateFinancialGoalSheet;
