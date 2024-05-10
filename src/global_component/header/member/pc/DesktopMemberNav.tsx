import React from "react";
import ThemeButton from "../../guest/pc/ThemeButton";
import LanguageButton from "../../guest/pc/LanguageButton";
import SignOutButton from "../SignOutButton";

const DesktopNav = () => {
  return (
    <menu className="max-md:hidden flex items-center gap-4">
      <li>
        <LanguageButton />
      </li>
      <li>
        <ThemeButton />
      </li>
      <li>
        <SignOutButton />
      </li>
    </menu>
  );
};

export default DesktopNav;
