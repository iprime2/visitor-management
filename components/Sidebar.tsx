"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";

import {
  LayoutDashboardIcon,
  User2,
  FileSpreadsheetIcon,
  ArrowLeftRightIcon,
  User2Icon,
  LogOutIcon,
  Users2Icon,
  SettingsIcon,
  NotebookTextIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import logoWhiteImage from "../assets/mit_logo_white.png";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboardIcon,
    color: "text-sky-500",
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: User2Icon,
    color: "text-red-500",
  },
  {
    label: "Attendees",
    href: "/admin/attendees",
    icon: Users2Icon,
    color: "text-green-500",
  },
  {
    label: "Visitors",
    href: "/admin/visitors",
    icon: ArrowLeftRightIcon,
    color: "text-teal-500",
  },
  {
    label: "Reports",
    href: "/admin/reports",
    icon: FileSpreadsheetIcon,
    color: "text-violet-500",
  },
  {
    label: "Feedbacks",
    href: "/admin/feedbacks",
    icon: NotebookTextIcon,
    color: "text-amber-500",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: SettingsIcon,
    color: "text-teal-500",
  },
  {
    label: "Logout",
    href: "/logout",
    icon: LogOutIcon,
    color: "text-gray-700",
  },
];
const Sidebar = () => {
  const pathName = usePathname();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-4 py-4 flex flex-col w-full h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-2">
        <div className="flex items-center justify-center w-full mr-2">
          <Link href="/">
            <Image
              src={logoWhiteImage}
              className="cursor-pointer"
              alt="logo"
              width={190}
              height={55}
            />
          </Link>
        </div>
        <div className="space-y-1 mt-8">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathName === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
