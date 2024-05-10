import React from "react";
import GuestLinks from "../GuestLinks";
import { Separator } from "@/components/ui/separator";
import LanguageButton from "./LanguageButton";
import ThemeButton from "./ThemeButton";

const DesktopGuestNav = () => {
  return (
    <div className="max-md:hidden flex">
      <menu className="flex gap-5 font-semibold text-xl">
        <GuestLinks />
      </menu>
      <Separator orientation="vertical" className="h-[40%] mx-4" />
      <LanguageButton />
      <ThemeButton />
    </div>
  );
};

export default DesktopGuestNav;
