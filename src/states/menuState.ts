"use client";

import { create } from "zustand";

type Menu = {
  isOpen: boolean;
  isMobile: boolean;
  toggleMobile: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
};

const useMenu = create<Menu>((set) => ({
  isOpen: false,
  isMobile: false,
  openMenu: () => set({ isOpen: true }),
  closeMenu: () => set({ isOpen: false }),
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleMobile: () => set((state) => ({ isMobile: !state.isMobile })),
}));

export default useMenu;
