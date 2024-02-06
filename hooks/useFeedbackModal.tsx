import { create } from "zustand";

interface useFeedbackModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useFeedbackModal = create<useFeedbackModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
