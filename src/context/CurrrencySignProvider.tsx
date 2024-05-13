"use client";

import { createContext, useContext } from "react";

const CurrencySign = createContext<string | "$">("$");

export const CurrencySignProvider = ({
  children,
  currencySign,
}: {
  children: React.ReactNode;
  currencySign: string;
}) => {
  return (
    <CurrencySign.Provider value={currencySign}>
      {children}
    </CurrencySign.Provider>
  );
};

export const useCurrencySign = () => {
  return useContext(CurrencySign);
};
