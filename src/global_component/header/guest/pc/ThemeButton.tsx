"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  if (theme === "dark") {
    return (
      <button onClick={() => setTheme("light")}>
        <Sun size={30} className="hover:text-primary" />
      </button>
    );
  }

  return (
    <button onClick={() => setTheme("dark")}>
      <Moon size={30} className="hover:text-primary" />
    </button>
  );
};

export default ThemeButton;
