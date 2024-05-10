"use client";

import React from "react";
import DesktopGuestNav from "./pc/DesktopGuestNav";
import MobileGuestNav from "./mobile/MobileGuestNav";

const GuestNav = () => {
  return (
    <nav className="flex items-center">
      <DesktopGuestNav />
      <MobileGuestNav />
    </nav>
  );
};

export default GuestNav;
