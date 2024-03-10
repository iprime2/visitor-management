"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

import { FeedbackFormValues } from "./FeedbackModal";
import { FileUploadFormValues } from "./FileUploadModal";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  // onSubmit: (data: FeedbackFormValues | FileUploadFormValues) => void | any;
  onSubmit: any;
}

const CustomModal: FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  onSubmit,
  disabled,
}) => {
  const [showCustomModal, setShowCustomModal] = useState(isOpen);

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setShowCustomModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowCustomModal(false);
    // setTimeout(() => {
    onClose();
    // }, 300);
  }, [disabled, onClose]);

  if (!mounted) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 ">
        <div className="relative w-full md:w-4/6 lg:w3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* Content */}
          <div
            className={`translate duration-300 h-full ${
              showCustomModal ? "translate-y-0" : "translate-y-full"
            }
            ${showCustomModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-slate-800">
              {/* Header */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-0"
                >
                  <X size={26} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* Footer */}
              <div className="flex flex-col p-6">{footer}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomModal;
