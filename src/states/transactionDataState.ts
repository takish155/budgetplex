"use client";

import { create } from "zustand";

export type TransactionData = {
  type: string;
  title: string;
  id: string;
  description: string | null;
  category: string;
  amount: number;
  date: Date;
};

type TransactionDataState = {
  transactionData: TransactionData[];
  setTransactionData: (data: TransactionData[]) => void;
};

export const useTransactionData = create<TransactionDataState>((set) => ({
  transactionData: [],
  setTransactionData: (data) => set({ transactionData: data }),
}));
