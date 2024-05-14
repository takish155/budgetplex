"use client";

import { useTheme } from "next-themes";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  const theme = useTheme();
  return <ClipLoader color={theme.theme === "dark" ? "white" : "black"} />;
};

export default Spinner;
