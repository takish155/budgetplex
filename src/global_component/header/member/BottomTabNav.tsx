"use client";

import { Card } from "@/components/ui/card";
import useSessionMenu from "@/states/sessionMenuState";
import { DollarSign, GanttChartSquareIcon, HandCoinsIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const BottomTabNav = () => {
  const t = useTranslations("AuthenticatedMenu");
  const locale = useLocale();
  const pathname = usePathname();
  const { isMobile } = useSessionMenu();

  if (!isMobile) return null;

  return (
    <Card className="w-[100vw] fixed bottom-0 h-[15h]">
      <nav className="flex gap-4 justify-around items-center h-full">
        <Link href={`/${locale}/dashboard`} passHref>
          <div
            className={`py-2 flex flex-col justify-center items-center ${
              pathname.includes("dashboard") ? "text-primary" : ""
            }`}
          >
            <HandCoinsIcon size={25} />
            <p className="text-paragraph font-light pt-1">
              {t("transactions")}
            </p>
          </div>
        </Link>
        <Link href={`/${locale}/bills`} passHref>
          <div
            className={`py-2 flex flex-col justify-center items-center ${
              pathname.includes("bills") ? "text-primary" : ""
            }`}
          >
            <GanttChartSquareIcon size={25} />
            <p className="text-paragraph font-light pt-1">{t("bills")}</p>
          </div>
        </Link>
        <Link href={`/${locale}/salary`} passHref>
          <div
            className={`py-2 flex flex-col justify-center items-center ${
              pathname.includes("salary") ? "text-primary" : ""
            }`}
          >
            <DollarSign size={25} />
            <p className="text-paragraph font-light pt-1">
              {t("salaryManager")}
            </p>
          </div>
        </Link>
      </nav>
    </Card>
  );
};

export default BottomTabNav;
