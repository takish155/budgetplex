"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { SheetClose } from "@/components/ui/sheet";
import { useTheme } from "next-themes";

const MobileSelectTheme = () => {
  const t = useTranslations("Header");
  const theme = useTheme();

  return (
    <Select onValueChange={(e) => theme.setTheme(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t("changeTheme")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem defaultChecked={theme.theme === "dark"} value="dark">
          {t("darkMode")}
        </SelectItem>
        <SelectItem defaultChecked={theme.theme === "light"} value="light">
          {t("lightMode")}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default MobileSelectTheme;
