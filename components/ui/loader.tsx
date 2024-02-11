"use client";

import { ClipLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="flex h-full w-full justify-center pt-10">
      <ClipLoader
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="mt-8"
      />
    </div>
  );
};
