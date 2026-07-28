import { create } from 'zustand';

interface LoginAlertStore {
  isOpen: boolean;
  openAlert: () => void;
  closeAlert: () => void;
}

export const useLoginAlert = create<LoginAlertStore>((set) => ({
  isOpen: false,
  openAlert: () => set({ isOpen: true }),
  closeAlert: () => set({ isOpen: false }),
}));
