"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="w-full h-[80px] py-2 shadow-md flex xs:items-center xs:justify-between md:px-4 sm:px-1">
      <div>
        <Link
          href="/"
          className="sm:items-center sm:justify-center md:hidden sm:flex sm:w-auto"
        >
          <Image
            src="/mit-wpu_logo.png"
            className="ml-4 cursor-pointer"
            alt="logo"
            width={120}
            height={35}
          />
        </Link>
      </div>
      <div className="flex items-center justify-center h-full">
        <p className="font-bold sm:text-md md:text-xl lg:text-2xl">
          Visitor Management System
        </p>
      </div>
    </div>
  );
};

export default Navbar;
