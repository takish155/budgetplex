"use client";

import {
  DollarSign,
  GanttChartSquareIcon,
  GoalIcon,
  HandCoinsIcon,
  LayoutDashboardIcon,
  LogOut,
  Settings,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AuthenticatedMenu = () => {
  const t = useTranslations("AuthenticatedMenu");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header>
      <nav>
        <h2 className="ml-3 text-miniheader font-semibold mb-3">
          {t("tools")}
        </h2>
        <menu className="mb-8">
          <Link passHref href={`/${locale}/dashboard`}>
            <li
              className={`text-paragraph flex items-center p-3 gap-2 hover:font-medium ${
                pathname.includes(`/${locale}/dashboard`)
                  ? "font-medium"
                  : "font-extralight hover:font-medium"
              }`}
            >
              <LayoutDashboardIcon /> {t("dashboard")}
            </li>
          </Link>
          <Link passHref href={`/${locale}/transaction`}>
            <li
              className={`text-paragraph flex items-center p-3 gap-2 hover:font-medium ${
                pathname.includes(`/${locale}/transaction`)
                  ? "font-medium"
                  : "font-extralight hover:font-medium"
              }`}
            >
              <HandCoinsIcon /> {t("transactions")}
            </li>
          </Link>
          <Link href={`/${locale}/bills`} passHref>
            <li
              className={`text-paragraph flex items-center p-3 gap-2 hover:font-medium ${
                pathname === `/${locale}/bills`
                  ? "font-medium"
                  : "font-extralight hover:font-medium"
              }`}
            >
              <GanttChartSquareIcon /> {t("bills")}
            </li>
          </Link>
          <Link href={`/${locale}/salary/0`} passHref>
            <li
              className={`text-paragraph flex items-center p-3 gap-2 hover:font-medium ${
                pathname.includes(`/${locale}/salary`)
                  ? "font-medium"
                  : "font-extralight hover:font-medium"
              }`}
            >
              <DollarSign />
              {t("salaryManager")}
            </li>
          </Link>
          <Link href={`/${locale}/financial-goals/`} passHref>
            <li
              className={`text-paragraph flex items-center p-3 gap-2 hover:font-medium ${
                pathname === `/${locale}/financial-goals`
                  ? "font-medium"
                  : "font-extralight hover:font-medium"
              }`}
            >
              <GoalIcon />
              {t("financialGoals")}
            </li>
          </Link>
        </menu>
        <h2 className="ml-3 text-miniheader font-semibold mb-3">
          {t("accountHeader")}
        </h2>
        <menu className="mb-8">
          <Link href={`/${locale}/settings`} passHref>
            <li
              className={`text-paragraph flex items-center p-3 gap-2 hover:font-medium ${
                pathname === `/${locale}/settings`
                  ? "font-medium"
                  : "font-extralight hover:font-medium"
              }`}
            >
              <Settings />
              {t("setting")}
            </li>
          </Link>
          <li
            className={`text-paragraph flex items-center p-3 gap-2 hover:font-medium cursor-pointer ${
              pathname === `/${locale}/a`
                ? "font-medium"
                : "font-extralight hover:font-medium"
            }`}
            onClick={() => signOut()}
          >
            <LogOut />
            {t("signOut")}
          </li>
        </menu>
      </nav>
    </header>
  );
};
export default AuthenticatedMenu;
