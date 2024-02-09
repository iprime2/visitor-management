"use client";

import { ClipLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="flex h-view w-full items-center justify-center">
      <ClipLoader color="#3498db" size={50} />
    </div>
  );
};
