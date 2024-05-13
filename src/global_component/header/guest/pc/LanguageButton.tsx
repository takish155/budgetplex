"use client";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const LanguageButton = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Header");

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
      <p className="sr-only">
        {t("toggleLanguage", {
          language: locale === "en" ? "Japanese" : "英語",
        })}
      </p>
    </button>
  );
};

export default LanguageButton;
