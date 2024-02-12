"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import CellAction from "@/components/CellAction";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";

export type UserColumnType = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<UserColumnType>[] =
  [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "isAdmin",
      header: "Admin",
      cell: ({ row }) => (
        <div className="flex items-center ml-3">
          {row.original.isAdmin ? (
            <CheckCircle2Icon className="text-green-500" />
          ) : (
            <XCircleIcon className="text-red-500" />
          )}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => (
        <div className="flex">{format(row.original.createdAt, "PP")}</div>
      ),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => <CellAction data={row.original} type={"users"} />,
    },
  ];
