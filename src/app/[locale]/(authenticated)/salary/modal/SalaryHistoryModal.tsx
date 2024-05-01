import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import React from "react";
import SalaryDialogHeader from "../component/SalaryDialogHeader";
import RenderSalaryHistoryList from "../render/RenderSalaryHistoryList";
import { useTranslations } from "next-intl";

const SalaryHistoryModal = () => {
  const t = useTranslations("Salary");

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"outline"}>
          <History />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[100vh] overflow-y-scroll max-h-[80vh]">
        <SalaryDialogHeader />
        <RenderSalaryHistoryList />
        <AlertDialogFooter>
          <AlertDialogCancel>{t("close")}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SalaryHistoryModal;
