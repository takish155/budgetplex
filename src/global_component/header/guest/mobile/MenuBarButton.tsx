"use client";

import useMenu from "@/states/menuState";
import { Menu, X } from "lucide-react";
import React from "react";

const MenuBarButton = () => {
  const { toggleMenu, isOpen } = useMenu();

  if (isOpen) {
    return (
      <button onClick={() => toggleMenu()}>
        <X size={40} />
      </button>
    );
  }

  return (
    <button onClick={() => toggleMenu()}>
      <Menu size={40} />
    </button>
  );
};

export default MenuBarButton;
