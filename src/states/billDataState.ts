"use client";

import { create } from "zustand";

export type BillData = {
  id: string;
  billName: string;
  billAmount: number;
  billNote: string | null;
  frequency: number;
  dueDate: Date;
  isPaid: boolean;
};

type TransactionDataState = {
  billData: BillData[];
  setBillData: (data: BillData[]) => void;
};

export const useBillData = create<TransactionDataState>((set) => ({
  billData: [],
  setBillData: (data) => set({ billData: data }),
}));
