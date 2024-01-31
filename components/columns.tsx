"use client";

import { format, formatDistanceToNow } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

export type Records = {
  id: string;
  visitorName: string;
  visitorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Records>[] = [
  {
    accessorKey: "visitorId",
    header: "Visitor Id",
  },
  {
    accessorKey: "visitorName",
    header: "Visitor Name",
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
