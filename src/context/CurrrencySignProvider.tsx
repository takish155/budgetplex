"use client";

import { trpc } from "@/app/_trpc/client";
import { createContext, useContext } from "react";

const CurrencySign = createContext<string | "$">("$");

export const CurrencySignProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, data } = trpc.balance.getCurrencySign.useQuery();

  return (
    <CurrencySign.Provider value={isLoading ? "" : data!}>
      {children}
    </CurrencySign.Provider>
  );
};

export const useCurrencySign = () => {
  return useContext(CurrencySign);
};
