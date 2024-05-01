import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings } from "lucide-react";
import React from "react";
import { UserSalarySettingsModalProps } from "../types/shift.type";
import UpdateUserSalarySettingsForm from "../forms/UpdateUserSalarySettingsForm";
import { useTranslations } from "next-intl";

const UserSalarySettingsModal = ({
  data,
}: {
  data: UserSalarySettingsModalProps;
}) => {
  const t = useTranslations("Salary");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"link"}>
          <Settings />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-8">
          <SheetTitle>{t("updateSalarySettings")}</SheetTitle>
          <SheetDescription>
            {t("updateSalarySettingsDescription")}
          </SheetDescription>
        </SheetHeader>
        <UpdateUserSalarySettingsForm data={data} />
      </SheetContent>
    </Sheet>
  );
};

export default UserSalarySettingsModal;
