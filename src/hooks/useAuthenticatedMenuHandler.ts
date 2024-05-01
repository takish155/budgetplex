import useSessionMenu from "@/states/sessionMenuState";
import React, { useEffect } from "react";

const useAuthenticatedMenuHandler = () => {
  const { toggleMobile, toggleMenu, isMobile, isOpen } = useSessionMenu();
  useEffect(() => {
    if (window.innerWidth < 768 && !isMobile) {
      document.getElementById("header")!.style.justifyContent = "flex-start";
      toggleMobile();
    }
  }, [toggleMobile, isMobile]);

  const handleCloseMenu = () => {
    if (isMobile && isOpen) {
      toggleMenu();
    }
  };

  return { handleCloseMenu };
};

export default useAuthenticatedMenuHandler;
