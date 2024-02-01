"use client";
import React from "react";
import Image from "next/image";
const Navbar = () => {
  return (
    <nav className="flex items-center w-full h-[90px] border-b shadow-md mb-5 sm:px-2 md:px-10">
      <div className="p-2">
        <Image
          src="/mit-wpu_logo.png"
          className="ml-4"
          alt="logo"
          width={260}
          height={60}
        />
      </div>
      <div className="flex items-center justify-center h-full ml-[20%]">
        <p className="font-bold sm:text-sm md:text-xl lg:text-2xl">
          Visitor Management System
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
