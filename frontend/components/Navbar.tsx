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
        "w-full h-[100px] py-2 shadow-md flex gap-2 items-center md:justify-between px-4",
        type === "admin" && "md:items-start"
      )}
    >
      <div className={cn("w-full", type === "admin" && "md:hidden")}>
        <Link
          href="/"
          className={cn(
            "w-auto flex items-center",
            type === "admin" && "md:hidden items-start justify-start"
          )}
        >
          <Image
            src={logoImage}
            className="ml-4 cursor-pointer object-contain md:w-[350px] md:h-[55px] sm:w-[120px] sm:h-[35px]"
            alt="logo"
            width={120}
            height={35}
          />
        </Link>
      </div>
      <div
        className={cn(
          "flex items-center h-full w-full",
          type === "public" && "md:mr-[500px]"
        )}
      >
        <p className="w-full font-bold sm:text-md md:text-xl lg:text-2xl">
          Visitor Management System
        </p>
      </div>
    </div>
  );
};

export default Navbar;
