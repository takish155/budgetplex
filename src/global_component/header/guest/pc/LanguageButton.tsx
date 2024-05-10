"use client";
import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const LanguageButton = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <button
      className="mr-4 hover:text-primary"
      onClick={() => {
        if (locale === "en") {
          router.push(pathname.replace(/en/, "ja"));
        } else {
          router.push(pathname.replace(/ja/, "en"));
        }
      }}
    >
      <Languages />
    </button>
  );
};

export default LanguageButton;
