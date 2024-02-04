"use client";

import { format, formatDistanceToNow } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Record } from "@prisma/client";
import { cn } from "@/lib/utils";

export const recordColumns: ColumnDef<Record>[] = [
  {
    accessorKey: "visitorPrn",
    header: "Prn",
  },
  {
    accessorKey: "visitorName",
    header: "Name",
  },
  {
    accessorKey: "inTime",
    header: "In Time",
    cell: ({ row }) => (
      <div className="flex">{format(row.original?.inTime, "p")}</div>
    ),
  },
  {
    accessorKey: "outTime",
    header: "Out Time",
    cell: ({ row }) => (
      <div className="flex">
        {row.original.outTime ? format(row.original?.outTime, "p") : "NAN"}
      </div>
    ),
  },
  {
    accessorKey: "Total Time",
    header: "Total Time",
    cell: ({ row }) => (
      <div
        className={cn(
          "flex p-1 text-white",
          row.original.outTime ? "bg-green-500" : "bg-red-500"
        )}
      >
        {row.original.inTime ? formatDistanceToNow(row.original.inTime) : "NAN"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex">
        {row.original.createdAt ? format(row.original.createdAt, "PP") : "NAN"}
      </div>
    ),
  },
];
