import React from "react";

const BodyWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col items-center justify-center md:py-4 sm:py-2 sm:px-8 md:px-4 lg:px-24">
      <div className="w-full h-screen p-2 gap-4 flex flex-col">{children}</div>
    </div>
  );
};

export default BodyWrapper;
