import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import React from "react";
import GuestLinks from "../GuestLinks";
import useMenu from "@/states/menuState";

const MobileGuestNav = () => {
  const { isOpen, openMenu } = useMenu();

  return (
    <Sheet open={isOpen}>
      <SheetTrigger asChild onClick={() => openMenu()} className="md:hidden">
        <MenuIcon size={35} className="my-auto" />
      </SheetTrigger>
      <SheetContent>
        <menu className="text-3xl font-semibold grid gap-2 mt-8">
          <GuestLinks />
        </menu>
      </SheetContent>
    </Sheet>
  );
};

export default MobileGuestNav;
