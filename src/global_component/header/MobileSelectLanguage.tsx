"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const MobileSelectLanguage = () => {
  const locale = useLocale();
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mb-4">
      <Select onValueChange={(e) => router.push(pathname.replace(locale, e))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("language")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem defaultChecked={locale === "en"} value="en">
            {t("english")}
          </SelectItem>
          <SelectItem defaultChecked={locale === "ja"} value="ja">
            {t("japanese")}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MobileSelectLanguage;
