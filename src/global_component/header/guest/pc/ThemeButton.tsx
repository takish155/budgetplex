"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import React from "react";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Header");

  if (theme === "dark") {
    return (
      <button onClick={() => setTheme("light")}>
        <Sun size={30} className="hover:text-primary" />
        <p className="sr-only">{t("toggleLightMode")}</p>
      </button>
    );
  }

  return (
    <button onClick={() => setTheme("dark")}>
      <Moon size={30} className="hover:text-primary" />
      <p className="sr-only">{t("toggleDarkMode")}</p>
    </button>
  );
};

export default ThemeButton;
