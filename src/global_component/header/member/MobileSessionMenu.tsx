"use client";

import AuthenticatedMenu from "@/app/[locale]/(authenticated)/AuthenticatedMenu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useAuthenticatedMenuHandler from "@/hooks/useAuthenticatedMenuHandler";
import useSessionMenu from "@/states/sessionMenuState";
import { Menu } from "lucide-react";
import React from "react";

const MobileSessionMenu = () => {
  const { isOpen, toggleMenu, isMobile } = useSessionMenu();
  useAuthenticatedMenuHandler();

  if (!isMobile) return null;

  return (
    <Sheet open={isOpen}>
      <SheetTrigger className="md:hidden" asChild onClick={() => toggleMenu()}>
        <Menu size={30} className="ml-2" />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <AuthenticatedMenu />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSessionMenu;
