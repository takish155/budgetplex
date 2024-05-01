"use client";

import { create } from "zustand";

type SessionMenu = {
  isOpen: boolean;
  isMobile: boolean;
  toggleMenu: () => void;
  toggleMobile: () => void;
  closeMenu: () => void;
};

const useSessionMenu = create<SessionMenu>((set) => ({
  isOpen: false,
  isMobile: false,
  toggleMenu: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
  toggleMobile: () => set(() => ({ isMobile: true })),
  closeMenu: () => set(() => ({ isOpen: false })),
}));

export default useSessionMenu;
