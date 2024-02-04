"use client";

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Visitor } from "@prisma/client";

export const visitorColumns: ColumnDef<Visitor>[] = [
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
