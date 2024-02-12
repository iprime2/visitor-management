"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import logoImage from "../assets/mit-wpu_logo.png";

type NavbarPropsType = {
  type: string;
};
const Navbar: FC<NavbarPropsType> = ({ type }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "w-full h-[80px] py-2 shadow-md flex",
        type === "admin" &&
          "sm:items-center sm:justify-between md:px-4 sm:px-1",
        type === "public" && "items-center justify-between px-4"
      )}
    >
      <div>
        <Link
          href="/"
          className={cn(
            type === "admin" &&
              "sm:items-center sm:justify-center md:hidden sm:flex sm:w-auto",
            type === "public" && "flex items-center"
          )}
        >
          <Image
            src={logoImage}
            className="ml-4 cursor-pointer object-contain md:w-[260px] md:h-[55px] sm:w-[120px] sm:h-[35px]"
            alt="logo"
            width={120}
            height={35}
          />
        </Link>
      </div>
      <div
        className={cn(
          "flex items-center h-full w-full",
          type === "public" && "md:pr-[220px] justify-center"
        )}
      >
        <p className="font-bold sm:text-md md:text-xl lg:text-2xl">
          Visitor Management System
        </p>
      </div>
    </div>
  );
};

export default Navbar;
