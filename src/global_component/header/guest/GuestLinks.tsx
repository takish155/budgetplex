"use client";

import useMenu from "@/states/menuState";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const GuestLinks = () => {
  const { closeMenu } = useMenu();
  const locale = useLocale();
  const t = useTranslations("Header");
  const pathname = usePathname();

  return (
    <>
      <li>
        <Link
          onClick={() => closeMenu()}
          href={`/${locale}/`}
          className={
            pathname === `/${locale}` ? "text-primary" : "hover:text-primary"
          }
        >
          {t("home")}
        </Link>
      </li>
      <li>
        <Link
          onClick={() => closeMenu()}
          href={`/${locale}/auth/signin`}
          className={
            pathname === `/${locale}/auth/signin`
              ? "text-primary"
              : "hover:text-primary"
          }
        >
          {t("login")}
        </Link>
      </li>
      <li>
        <Link
          onClick={() => closeMenu()}
          href={`/${locale}/auth/signup`}
          className={
            pathname === `/${locale}/auth/signup  `
              ? "text-primary"
              : "hover:text-primary"
          }
        >
          {t("register")}
        </Link>
      </li>
    </>
  );
};

export default GuestLinks;
