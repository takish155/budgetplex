"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Nav = ({
  home,
  login,
  register,
}: {
  home: string;
  login: string;
  register: string;
}) => {
  const pathName = usePathname();
  const locale = useLocale();

  return (
    <nav className="max-[800px]:hidden">
      <ul className="flex gap-5 text-xl font-medium">
        <li
          className={`${
            pathName === `/${locale}`
              ? "border-b-current border-b-2"
              : "hover:border-b-current hover:border-b-2"
          }`}
        >
          <Link href="/">{home}</Link>
        </li>
        <li
          className={`${
            pathName === `/${locale}/auth/signin`
              ? "border-b-current border-b-2"
              : "hover:border-b-current hover:border-b-2"
          }`}
        >
          <Link href={`/${locale}/auth/signin`}>{login}</Link>
        </li>
        <li
          className={`${
            pathName === `/${locale}/auth/signup`
              ? "border-b-current border-b-2"
              : "hover:border-b-current hover:border-b-2"
          }`}
        >
          <Link href={`/${locale}/auth/signup`}>{register}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
