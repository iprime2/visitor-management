"use client";

import { FileTextIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { CldUploadButton } from "next-cloudinary";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return false;
  }

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <div
        className="
            p-4 
            border-4 
            border-dashed
            border-primary/10 
            rounded-lg 
            hover:opacity-75 
            transition 
            flex 
            flex-col 
            space-y-2 
            items-center 
            justify-center
          "
      >
        <div className="relative h-40 w-40">
          {value ? (
            <Image
              fill
              alt="Upload"
              src={value}
              className="rounded-lg object-cover"
            />
          ) : (
            <FileTextIcon />
          )}
        </div>
      </div>
    </div>
  );
};
