"use client";
import React from "react";
import logo from "/mit-wpu_logo.png";
const Navbar = () => {
  return (
    <nav className="w-full h-[80px] bg-slate-900">
      <div className="flex items-center justify-center h-full">
        <p className="font-bold text-white sm:text-sm md:text-xl lg:text-2xl">
          Visitor Management System
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
