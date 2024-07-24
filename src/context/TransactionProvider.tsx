"use client";

import useTransaction, {
  UseTransaction,
} from "@/app/[locale]/(authenticated)/transaction/hooks/useTransaction";
import { ReactNode, createContext, useContext } from "react";

const TransactionContext = createContext<UseTransaction | undefined>(undefined);

export const TransactionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useTransaction();

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
