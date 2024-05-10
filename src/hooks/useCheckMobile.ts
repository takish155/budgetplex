import useMenu from "@/states/menuState";
import React, { useEffect } from "react";
const useCheckMobile = () => {
  const { toggleMobile } = useMenu();

  useEffect(() => {
    if (window.innerWidth < 768) toggleMobile();
    const handleResize = () => {
      if (window.innerWidth < 768) toggleMobile();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggleMobile]);
};

export default useCheckMobile;
