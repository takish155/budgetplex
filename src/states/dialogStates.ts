"use client";

import { create } from "zustand";

type DialogStates = {
  isDelateModalOpen: boolean;
  isAddProgressModalOpen: boolean;
  isRemoveFinancialGoalModalOpen: boolean;
  isSalaryHistoryModalOpen: boolean;
  toggleDeleteModal: () => void;
  toggleAddProgressModal: () => void;
  toggleRemoveFinancialGoalModal: () => void;
  toggleSalaryHistoryModal: () => void;
};

export const useDialogStates = create<DialogStates>((set) => ({
  isDelateModalOpen: false,
  isAddProgressModalOpen: false,
  isRemoveFinancialGoalModalOpen: false,
  isSalaryHistoryModalOpen: false,
  toggleDeleteModal: () =>
    set((state) => ({ isDelateModalOpen: !state.isDelateModalOpen })),
  toggleAddProgressModal: () =>
    set((state) => ({ isAddProgressModalOpen: !state.isAddProgressModalOpen })),
  toggleRemoveFinancialGoalModal: () =>
    set((state) => ({
      isRemoveFinancialGoalModalOpen: !state.isRemoveFinancialGoalModalOpen,
    })),
  toggleSalaryHistoryModal: () =>
    set((state) => ({
      isSalaryHistoryModalOpen: !state.isSalaryHistoryModalOpen,
    })),
}));
