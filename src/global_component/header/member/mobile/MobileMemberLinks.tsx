"use client";

import { SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const MobileMemberLinks = ({
  title,
  links,
}: {
  title: string;
  links: {
    name: string;
    href: string;
    icon: ReactNode;
  }[];
}) => {
  const pathname = usePathname();

  return (
    <>
      <h2 className="ml-3 text-miniheader font-semibold mb-3">{title}</h2>
      <menu className="mb-8">
        {links.map((link) => {
          return (
            <Link href={link.href} passHref key={link.name}>
              <SheetClose asChild>
                <li
                  className={`text-paragraph flex items-center p-3 gap-2 hover:font-medium ${
                    pathname.includes(link.href)
                      ? "font-medium"
                      : "font-extralight hover:font-medium"
                  }`}
                >
                  {link.icon} {link.name}
                </li>
              </SheetClose>
            </Link>
          );
        })}
      </menu>
    </>
  );
};

export default MobileMemberLinks;
