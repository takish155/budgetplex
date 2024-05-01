"use client";

import useMenu from "@/states/menuState";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileMenu = ({
  login,
  register,
  home,
}: {
  login: string;
  register: string;
  home: string;
}) => {
  const { isOpen, closeMenu } = useMenu();
  const pathName = usePathname();
  const locale = useLocale();

  if (isOpen) {
    return (
      <nav className="w-full h-[100vh] overflow-hidden sticky bot-0 bg-inherit p-4">
        <ul className="text-xl">
          <li
            className={`${pathName === `/${locale}` ? "font-bold" : ""} mb-2 `}
          >
            <Link onClick={() => closeMenu()} href="/">
              {home}
            </Link>
          </li>
          <li
            className={`${
              pathName === `/${locale}/auth/signin` ? "font-bold" : ""
            } mb-2 `}
          >
            <Link onClick={() => closeMenu()} href="/">
              {login}
            </Link>
          </li>
          <li
            onClick={() => closeMenu()}
            className={`${
              pathName === `/${locale}/auth/signup` ? "font-bold" : ""
            } mb-2 `}
          >
            <Link href="/">{register}</Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default MobileMenu;
