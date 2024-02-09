import { create } from "zustand";

interface useFeedbackModalProps {
  isOpen: boolean;
  outVisitorId: string | null | undefined;
  onOpen: (outVisitorId: string) => void;
  onClose: () => void;
}

export const useFeedbackModal = create<useFeedbackModalProps>((set) => ({
  isOpen: false,
  outVisitorId: null,
  onOpen: (outVisitorId: string) => set({ isOpen: true, outVisitorId }),
  onClose: () => set({ isOpen: false }),
}));
