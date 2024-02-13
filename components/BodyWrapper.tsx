"use client";
import React, { useEffect, useState } from "react";

const BodyWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center md:py-4 md:px-2 sm:py-2 sm:px-8 lg:px-24">
      <div className="w-full h-screen p-2 gap-4 flex flex-col">{children}</div>
    </div>
  );
};

export default BodyWrapper;
