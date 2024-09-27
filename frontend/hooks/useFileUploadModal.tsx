import { create } from "zustand";

export interface useFileUploadModalProps {
  isOpen: boolean;
  visitorId: string | null | undefined;
  onOpen: (visitorId: string) => void;
  onClose: () => void;
}

export const useFileUploadModal = create<useFileUploadModalProps>((set) => ({
  isOpen: false,
  visitorId: null,
  onOpen: (visitorId: string) => set({ isOpen: true, visitorId }),
  onClose: () => set({ isOpen: false }),
}));
