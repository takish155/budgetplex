import React from "react";
import DesktopNav from "./pc/DesktopMemberNav";
import MobileMemberNav from "./mobile/MobileMemberNav";

const MemberNav = () => {
  return (
    <nav className="flex items-center">
      <menu>
        <DesktopNav />
        <MobileMemberNav />
      </menu>
    </nav>
  );
};

export default MemberNav;
